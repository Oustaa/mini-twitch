package utils

import (
	"slices"
	"sync"
	"unicode"
)

type Node struct {
	alphabet map[rune]*Node
	values   []string
}

var mu sync.RWMutex

func NewSearchTree() *Node {
	return &Node{alphabet: make(map[rune]*Node)}
}

func (node *Node) Add(value string) {
	mu.Lock()
	defer mu.Unlock()

	current := node
	for _, char := range value {
		char = unicode.ToLower(char)

		next, ok := current.alphabet[char]
		if !ok {
			next = &Node{alphabet: make(map[rune]*Node)}
			current.alphabet[char] = next
		}
		current = next
	}

	if current.values == nil {
		current.values = []string{}
	}

	current.values = append(current.values, value)
}

func (node *Node) Search(value string) bool {
	mu.RLock()
	defer mu.RUnlock()

	current := node

	for _, char := range value {
		char = unicode.ToLower(char)

		next, ok := current.alphabet[char]
		if !ok {
			return false
		}
		current = next
	}

	return slices.Contains(current.values, value)
}

func (node *Node) Suggestions(term string) []string {
	mu.RLock()
	defer mu.RUnlock()

	current := node

	for _, char := range term {
		char = unicode.ToLower(char)

		next, ok := current.alphabet[char]
		if !ok {
			return []string{}
		}

		current = next
	}

	return getAllValues(current)
}

func getAllValues(node *Node) []string {
	if node == nil {
		return nil
	}

	values := append([]string{}, node.values...)

	for _, next := range node.alphabet {
		values = append(values, getAllValues(next)...)
	}
	return values
}
