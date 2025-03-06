import { useState, useEffect } from 'react';

export function useSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);

  // Apply filters
  const applyFilters = (snippetsToFilter, categories = categoryFilter) => {
    if (categories.length === 0) {
      setFilteredSnippets(snippetsToFilter);
      return;
    }
    
    const filtered = snippetsToFilter.filter(snippet => {
      // Check if the snippet has at least one of the selected categories
      // This assumes each snippet has a 'categories' array property
      if (!snippet.categories) return false;
      return categories.some(category => snippet.categories.includes(category));
    });
    
    setFilteredSnippets(filtered);
  };
  
  // Load snippets when hook is used
  useEffect(() => {
    fetchSnippets();
  }, []);
  
  // Apply filters when snippets or categoryFilter changes
  useEffect(() => {
    applyFilters(snippets);
  }, [snippets, categoryFilter]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/snippets');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSnippets(data);
      
      // Apply any existing filters
      applyFilters(data);
      
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Add snippet function
  const addSnippet = async (newSnippet) => {
    try {
      const response = await fetch('http://localhost:3000/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSnippet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh snippets after adding
      await fetchSnippets();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Update snippet function
  const updateSnippet = async (id, updatedSnippet) => {
    try {
      const response = await fetch(`http://localhost:3000/snippets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSnippet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh snippets after updating
      await fetchSnippets();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Delete snippet function
  const deleteSnippet = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/snippets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh snippets after deleting
      await fetchSnippets();
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  // Filter handling
  const handleCategoryToggle = (category) => {
    const newFilter = categoryFilter.includes(category)
      ? categoryFilter.filter(c => c !== category)
      : [...categoryFilter, category];
    
    setCategoryFilter(newFilter);
    applyFilters(snippets, newFilter);
  };
  
  const clearFilters = () => {
    setCategoryFilter([]);
    setFilteredSnippets(snippets);
  };

  return {
    snippets,
    filteredSnippets,
    loading,
    error,
    categoryFilter,
    fetchSnippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    handleCategoryToggle,
    clearFilters
  };
} 