import api from './api';

export interface SearchResult {
  _id: string;
  title: string;
  type: 'institution' | 'job' | 'certificate' | 'classifier' | 'program';
  description: string;
  url: string;
  relevance: number;
}

// Description: Search across all content types
// Endpoint: GET /api/search
// Request: { query: string, types?: string[], limit?: number }
// Response: { results: SearchResult[], totalCount: number }
export const searchContent = (query: string, types?: string[], limit = 20) => {
  console.log('Searching for:', query, 'types:', types, 'limit:', limit);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        results: [
          {
            _id: '1',
            title: 'Tashkent State Technical University',
            type: 'institution',
            description: 'Leading technical university in Uzbekistan offering engineering and computer science programs.',
            url: '/institutions/1',
            relevance: 0.95
          },
          {
            _id: '2',
            title: 'Software Developer',
            type: 'job',
            description: 'Develop and maintain software applications using modern programming languages.',
            url: '/job-requirements#software-developer',
            relevance: 0.88
          },
          {
            _id: '3',
            title: 'Computer Science Program',
            type: 'program',
            description: 'Comprehensive computer science curriculum covering programming, algorithms, and software engineering.',
            url: '/programs#computer-science',
            relevance: 0.82
          }
        ],
        totalCount: 3
      });
    }, 400);
  });
};