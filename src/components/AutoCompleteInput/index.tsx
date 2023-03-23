import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useEventListener } from '../../hooks/useEventListener';
import Suggestions from '../Suggestions';
import styles from './styles';

const mockData = [
  'what is react',
  'what is functional component',
  'what is the difference between class and functional components',
  'what is react hooks',
  'why do we need fragment',
  'why do we use react hooks',
  'how do you use HOC component',
  'how do you create a React app',
  'how do you create an event',
  'explain how lits work',
  'explain the lifecycle methods of components',
  'explain the use of css modules',
  'how is react different from react native',
  'how is react different from angular',
  'what are the components in React',
  'what are synthetic events in React',
  'what are the differences between state and props',
];

const AutoCompleteInput: React.FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Array<string>>([])
  const debouncedSearchQuery = useDebounce(searchQuery, 250)

  useEffect(() => {
    const simulateFetchData = () => {
      try {
        const data = mockData;

        const foundTerms = data.filter(text => text.includes(debouncedSearchQuery))
        const hasFullMatch = foundTerms.some(term => term === debouncedSearchQuery)

        if (hasFullMatch || debouncedSearchQuery === '')
          setSuggestions([])
        else
          setSuggestions(foundTerms)
      } catch (err) {
        console.log(err)
      }
    }
    simulateFetchData()
  }, [debouncedSearchQuery])

  const escFunction = useCallback((event: any): any => {
    if (event.key === "Escape") {
      setSuggestions([])
    }
  }, []);

  useEventListener('keydown', escFunction, escFunction)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div style={styles.mainWrapper}>
      <div>
        <h1 style={styles.heading}>Type to test</h1>
        <small style={styles.subHeading}>Eg: 'what is' | 'react' | 'how' ...</small>
      </div>
      <div style={styles.inputWrapper}>
        <input style={styles.input} type="text" value={searchQuery} onChange={handleSearch} />
        <Suggestions
          searchTerm={searchQuery}
          suggestions={suggestions}
          setSearchQuery={setSearchQuery}
          setSuggestions={setSuggestions}
        />
      </div>
    </div>
  );
}

export default AutoCompleteInput