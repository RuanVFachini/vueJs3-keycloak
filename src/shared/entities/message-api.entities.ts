import { useMessage } from "naive-ui";
import { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";

export default class MessageApi {
  message: MessageApiInjection;
  info() {
    this.message.info(
      "I don't know why nobody told you how to unfold your love",
      {
        keepAliveOnHover: true,
      }
    );
  }
  error(message: string) {
    this.message.error(message);
  }
  warning() {
    this.message.warning("How many roads must a man walk down");
  }
  success() {
    this.message.success(
      "Cause you walked hand in hand With another man in my place"
    );
  }
  loading() {
    this.message.loading(
      "If I were you, I will realize that I love you more than any other guy"
    );
  }
  constructor() {
    this.message = useMessage();
  }
}
