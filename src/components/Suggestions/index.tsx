import React, { useState } from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import styles from './styles'

interface SuggestionsProps {
  suggestions: string[]
  searchTerm: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
}

const Suggestions: React.FunctionComponent<SuggestionsProps> =
  ({
    suggestions = [],
    searchTerm = '',
    setSearchQuery = (suggestion: string) => { },
    setSuggestions = (suggestions: []) => { }
  }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1)
    const handleSuggestionClick = (suggestion: string) => {
      setSearchQuery(suggestion)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault()
          setSelectedItemIndex((prevIndex: number) =>
            prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
          );
          break
        }
        case "ArrowDown": {
          event.preventDefault()
          setSelectedItemIndex((prevIndex: number) =>
            prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
          );
          break
        }
        case "Enter": {
          setSearchQuery(suggestions[selectedItemIndex])
          break
        }
      }
    };

    useEventListener('keydown', selectedItemIndex, handleKeyDown)

    return (
      <div style={styles.wrapper}>
        {suggestions.map((suggestion: string, index: number) => (
          <span
            key={`${index}-${suggestion}`}
            style={{
              ...styles.suggestionBtn,
              background: selectedItemIndex === index ? '#ccc' : '#fff'
            }}
            onClick={() => { handleSuggestionClick(suggestion) }}
            dangerouslySetInnerHTML={{
              __html: suggestion.replaceAll(searchTerm, `<strong>${searchTerm}</strong>`)
            }}
          />
        ))}
      </div>
    );
  }

export default Suggestions