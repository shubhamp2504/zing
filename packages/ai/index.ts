/**
 * ⚡ ZING AI Package — Public API
 */

export { ZingAI, getZingAI } from './providers';
export type { AIMessage, AIResponse, AIProvider, AIProviderOptions } from './providers';

export { runZingGuide, streamZingGuide, ZING_GUIDE_SYSTEM_PROMPT, ZING_GUIDE_TOOLS } from './guide';
export type { ToolExecutor } from './guide';

export { getSearchClient, SearchInputSchema, SEARCH_PLACEHOLDERS } from './search';
export type { SearchInput, SearchResult, SearchResponse } from './search';
