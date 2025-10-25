// API Client
export { ApiClient } from './apiClient';

// tRPC-style API
export { Api, createApi } from './api';

// Export all types from the shared types file for convenience
export type {
    User,
    UserCreate,
    UserUpdate,
    RegisterRequest,
    LoginRequest,
    RegisterResponse,
    LoginResponse,
    Channel,
    ChannelCreate,
    ChannelUpdate,
    Post,
    PostCreate,
    PostUpdate,
    Media,
    MediaCreate,
    MediaUpdate,
    Reaction,
    ReactionCreate,
    ReactionSummary,
    ReactionSummaryItem,
    Role,
    PostType,
    ChannelType
} from './types';

// Re-export routers for direct access if needed
export { UsersRouter } from './routers/users';
export { AuthRouter } from './routers/auth';
export { ChannelsRouter } from './routers/channels';
export { PostsRouter } from './routers/posts';
export { MediaRouter } from './routers/media';
export { ReactionsRouter } from './routers/reactions';
export { ArticlesRouter } from './routers/articles';
