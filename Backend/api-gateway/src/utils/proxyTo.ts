import http from "node:http";
import type { Request, Response } from "express";

const HOP_BY_HOP = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
];

function proxyTo(target: { host: string; port: number }) {
  return (req: Request, res: Response) => {
    const headers = { ...req.headers };

    for (const h of HOP_BY_HOP) delete headers[h];

    headers.host = `${target.host}:${target.port}`;

    const proxyReq = http.request(
      {
        host: target.host,
        port: target.port,
        path: req.url,
        method: req.method,
        headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
        proxyRes.pipe(res);
      },
    );

    proxyReq.on("error", () => {
      res.writeHead(502).end("Bad Gateway");
    });

    req.pipe(proxyReq);
  };
}

export default proxyTo;
