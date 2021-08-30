import { defer } from "rxjs";

export default function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
