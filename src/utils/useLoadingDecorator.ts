import { ElLoading } from 'element-plus';

export const useLoadingDecorator = <TReturns, TPayload extends unknown[]>(
  func: (...args: TPayload) => Promise<TReturns>,
) => {
  return (...args: TPayload): Promise<TReturns> => {
    return new Promise((resolve, reject) => {
      const loadingInstance = ElLoading.service({ fullscreen: true });
      try {
        const result = func(...args);
        if (result instanceof Promise) result.then(resolve);
        else resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        loadingInstance.close();
      }
    });
  };
};
