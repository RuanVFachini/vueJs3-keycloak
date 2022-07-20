import { InjectionKey } from "vue";
import MessageApi from "../entities/message-api.entities";
import { AppState } from "../entities/store.entities";

export const MessageApiKey = Symbol() as InjectionKey<MessageApi>;
export const AppStorekey: InjectionKey<AppState> = Symbol();
