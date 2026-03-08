/**
 * ⚡ ZING — tRPC server-side caller for Server Components
 * Usage: const topic = await api.topic.getBySlug({...});
 */

import { createServerCaller } from '@zing/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const api: any = createServerCaller();
