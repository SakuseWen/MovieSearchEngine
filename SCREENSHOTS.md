# 📸 Project Screenshots & Features

## Overview

Movie Search Engine is a full-stack application that provides powerful movie search capabilities using Elasticsearch.

## Key Features Showcase

### 🔍 Search Interface

The main search interface features:
- Real-time search with 300ms debouncing
- Multi-field search (title, original title, overview)
- Clean, modern UI with gradient background
- Responsive design for all screen sizes

**Search Bar Features:**
- Instant search results
- Support for English and Chinese queries
- Search across multiple fields with weighted scoring

### 🎯 Advanced Filtering

**Filter Options:**
- **Genre Filter**: Select multiple genres
- **Year Range**: Slider to filter by release year (1970-2025)
- **Sort Options**: 
  - By Rating (highest first)
  - By Year (newest first)
  - By Title (alphabetical)

### 🎬 Movie Cards

Each movie card displays:
- Movie poster image
- Title and original title
- Release year
- Rating (out of 10)
- Genre tags
- Brief description

**Interactive Features:**
- Hover effects
- Click to view details
- Smooth animations

### 📊 Movie Details

Detailed view includes:
- Large poster image
- Full movie information
- Complete overview/description
- All metadata (year, rating, genres)
- Back button to return to search

### ⚡ Performance Features

**Loading States:**
- Spinner animation while fetching data
- Smooth transitions
- Error handling with user-friendly messages

**Error Handling:**
- Connection error messages
- Fallback UI for missing data
- Graceful degradation

## Technical Highlights

### Backend (Flask + Elasticsearch)

```python
# Multi-field search with weighted scoring
query = {
    "multi_match": {
        "query": search_term,
        "fields": [
            "title^5",           # Title has highest weight
            "original_title^4",  # Original title second
            "overview^2"         # Overview has lower weight
        ]
    }
}
```

### Frontend (React + TypeScript)

```typescript
// Real-time search with debouncing
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    fetchMovies();
  }, 300);
  return () => clearTimeout(debounceTimer);
}, [searchQuery]);
```

## Architecture

```
┌─────────────┐      HTTP/REST      ┌─────────────┐
│   React     │ ◄─────────────────► │   Flask     │
│  Frontend   │      JSON API       │   Backend   │
└─────────────┘                     └─────────────┘
                                           │
                                           │ Elasticsearch
                                           │ Python Client
                                           ▼
                                    ┌─────────────┐
                                    │Elasticsearch│
                                    │   Engine    │
                                    └─────────────┘
```

## Data Flow

1. **User Input** → Search query entered
2. **Debouncing** → Wait 300ms for user to finish typing
3. **API Request** → Frontend calls `/search?q=query`
4. **Elasticsearch Query** → Backend searches indexed movies
5. **Results Processing** → Transform and score results
6. **UI Update** → Display movies with filters applied

## Responsive Design

The application is fully responsive:
- **Desktop**: 3-column grid for movie cards
- **Tablet**: 2-column grid
- **Mobile**: Single column with optimized layout

## Color Scheme

- **Primary**: Purple gradient (`from-slate-900 via-purple-900 to-slate-900`)
- **Accent**: Purple-400 for highlights
- **Text**: White with varying opacity
- **Cards**: Semi-transparent black with backdrop blur

## Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast text
- Focus indicators

## Performance Optimizations

1. **Debounced Search**: Reduces API calls
2. **Lazy Loading**: Images load on demand
3. **Efficient Filtering**: Client-side filtering after initial fetch
4. **Optimized Bundle**: Vite build optimization
5. **Caching**: Browser caching for static assets

## Future Enhancements

- [ ] Add screenshots to this document
- [ ] Implement pagination for large result sets
- [ ] Add movie trailers
- [ ] User authentication and favorites
- [ ] Advanced search with more filters
- [ ] Movie recommendations
- [ ] Dark/Light theme toggle
- [ ] Export search results

---

**Note**: To add actual screenshots, take screenshots of your running application and add them to a `/screenshots` folder, then reference them here using:

```markdown
![Search Interface](screenshots/search-interface.png)
![Movie Details](screenshots/movie-details.png)
```
