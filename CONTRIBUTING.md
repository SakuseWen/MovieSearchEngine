# Contributing to Movie Search Engine

Thank you for your interest in contributing to the Movie Search Engine project! 

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Python version, Node version, etc.)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been requested
- Provide a clear use case
- Explain why this feature would be useful

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/SakuseWen/MovieSearchEngine.git
   cd MovieSearchEngine
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Ensure the backend API works correctly
   - Test the frontend UI
   - Check for console errors

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for review and address feedback

## Development Setup

### Backend Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run in development mode
python app.py
```

### Frontend Development

```bash
cd "电影搜索引擎网页 (1)"
npm install
npm run dev
```

### Code Style

#### Python
- Follow PEP 8 guidelines
- Use meaningful variable names
- Add docstrings for functions

#### TypeScript/React
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused

## Project Structure

```
MovieSearchEngine/
├── Backend (Python/Flask)
│   ├── app.py              # Main API server
│   ├── config.py           # Configuration
│   ├── fetch_movies.py     # Data fetching
│   └── index_movies.py     # Data indexing
│
└── Frontend (React/TypeScript)
    ├── src/
    │   ├── components/     # React components
    │   ├── services/       # API services
    │   └── styles/         # CSS styles
    └── vite.config.ts      # Vite configuration
```

## Testing

Currently, the project doesn't have automated tests. Contributions to add testing are highly welcome!

### Manual Testing Checklist

- [ ] Backend API responds correctly
- [ ] Search functionality works
- [ ] Filters work as expected
- [ ] UI is responsive on different screen sizes
- [ ] No console errors
- [ ] Error handling works properly

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion in GitHub Discussions
- Contact the maintainer

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

Thank you for contributing! 🎉
