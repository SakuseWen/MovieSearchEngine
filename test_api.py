"""
Simple API tests for Movie Search Engine
Run with: python test_api.py
"""

import requests
import json
from typing import Dict, Any


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'


def print_test(name: str, passed: bool, message: str = ""):
    """Print test result with color"""
    status = f"{Colors.GREEN}✓ PASS{Colors.END}" if passed else f"{Colors.RED}✗ FAIL{Colors.END}"
    print(f"{status} - {name}")
    if message:
        print(f"  {Colors.YELLOW}{message}{Colors.END}")


def test_health_check(base_url: str) -> bool:
    """Test if API is running"""
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        passed = response.status_code == 200
        print_test("Health Check", passed, f"Status: {response.status_code}")
        return passed
    except requests.exceptions.RequestException as e:
        print_test("Health Check", False, f"Error: {str(e)}")
        return False


def test_search_all(base_url: str) -> bool:
    """Test search without query (get all movies)"""
    try:
        response = requests.get(f"{base_url}/search", timeout=5)
        passed = response.status_code == 200
        
        if passed:
            data = response.json()
            has_results = "results" in data and len(data["results"]) > 0
            has_total = "total" in data
            passed = has_results and has_total
            
            if passed:
                print_test(
                    "Search All Movies",
                    True,
                    f"Found {data['total']} movies, returned {len(data['results'])} results"
                )
            else:
                print_test("Search All Movies", False, "Missing 'results' or 'total' in response")
        else:
            print_test("Search All Movies", False, f"Status: {response.status_code}")
        
        return passed
    except Exception as e:
        print_test("Search All Movies", False, f"Error: {str(e)}")
        return False


def test_search_with_query(base_url: str, query: str = "matrix") -> bool:
    """Test search with specific query"""
    try:
        response = requests.get(f"{base_url}/search", params={"q": query}, timeout=5)
        passed = response.status_code == 200
        
        if passed:
            data = response.json()
            has_results = "results" in data
            passed = has_results
            
            if passed:
                results_count = len(data["results"])
                print_test(
                    f"Search with Query '{query}'",
                    True,
                    f"Found {results_count} results"
                )
                
                # Print first result if available
                if results_count > 0:
                    first = data["results"][0]
                    print(f"  {Colors.BLUE}First result: {first.get('title', 'N/A')} "
                          f"(Rating: {first.get('rating', 'N/A')}){Colors.END}")
            else:
                print_test(f"Search with Query '{query}'", False, "Missing 'results' in response")
        else:
            print_test(f"Search with Query '{query}'", False, f"Status: {response.status_code}")
        
        return passed
    except Exception as e:
        print_test(f"Search with Query '{query}'", False, f"Error: {str(e)}")
        return False


def test_response_structure(base_url: str) -> bool:
    """Test if response has correct structure"""
    try:
        response = requests.get(f"{base_url}/search?q=test", timeout=5)
        data = response.json()
        
        # Check required fields
        required_fields = ["total", "results"]
        has_required = all(field in data for field in required_fields)
        
        if not has_required:
            print_test("Response Structure", False, "Missing required fields")
            return False
        
        # Check result structure if results exist
        if len(data["results"]) > 0:
            result = data["results"][0]
            result_fields = ["id", "title", "rating"]
            has_result_fields = all(field in result for field in result_fields)
            
            if not has_result_fields:
                print_test("Response Structure", False, "Result missing required fields")
                return False
        
        print_test("Response Structure", True, "All required fields present")
        return True
        
    except Exception as e:
        print_test("Response Structure", False, f"Error: {str(e)}")
        return False


def run_all_tests(base_url: str = "http://localhost:5000"):
    """Run all API tests"""
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}Movie Search Engine - API Tests{Colors.END}")
    print(f"{Colors.BLUE}Testing: {base_url}{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}\n")
    
    tests = [
        ("Health Check", lambda: test_health_check(base_url)),
        ("Search All", lambda: test_search_all(base_url)),
        ("Search Query", lambda: test_search_with_query(base_url, "inception")),
        ("Response Structure", lambda: test_response_structure(base_url)),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print_test(name, False, f"Unexpected error: {str(e)}")
            results.append(False)
        print()  # Empty line between tests
    
    # Summary
    passed = sum(results)
    total = len(results)
    percentage = (passed / total * 100) if total > 0 else 0
    
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}Test Summary{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    
    if passed == total:
        print(f"{Colors.GREEN}All tests passed! ({passed}/{total}){Colors.END}")
    else:
        print(f"{Colors.YELLOW}Tests passed: {passed}/{total} ({percentage:.1f}%){Colors.END}")
        print(f"{Colors.RED}Tests failed: {total - passed}{Colors.END}")
    
    print(f"{Colors.BLUE}{'='*60}{Colors.END}\n")
    
    return passed == total


if __name__ == "__main__":
    import sys
    
    # Allow custom base URL
    base_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5000"
    
    try:
        success = run_all_tests(base_url)
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Tests interrupted by user{Colors.END}")
        sys.exit(1)
