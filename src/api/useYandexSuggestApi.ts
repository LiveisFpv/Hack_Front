export default () => {
  const getYandexData = async (access_token: string) => {
    return new Promise((resolve, reject) => {
      const query = {
        format: 'jwt',
        jwt_secret: import.meta.env.VITE_CLIENT_SECRET_YA,
      };

      const params = new URLSearchParams();
      if (query) {
        if ('id' in query) {
          (Object.keys(query) as (keyof typeof query)[]).forEach((queryParamKey) =>
            params.append(queryParamKey as string, query[queryParamKey]!.toString()),
          );
        } else {
          params.append('data', JSON.stringify(query));
        }
      }
      const paramsStr = params.toString();

      fetch(`https://login.yandex.ru/info?${paramsStr ? `?${paramsStr}` : ''}`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + access_token,
        },
        method: 'GET',
      }).then(
        (result) => resolve(result.json()),
        (error) => reject(error),
      );

      (
        window as unknown as { YaSendSuggestToken: (...args: unknown[]) => void }
      ).YaSendSuggestToken('https://hackatonsite.jumpingcrab.com', {
        flag: true,
      });
    });
  };

  const getToken = () => {
    (
      window as typeof window & {
        YaAuthSuggest: {
          init: (...args: unknown[]) => Promise<{ handler: () => unknown }>;
        };
      }
    ).YaAuthSuggest.init(
      {
        client_id: import.meta.env.VITE_CLIENT_ID_YA,
        response_type: 'token',
      },
      {
        view: 'button',
        parentId: 'buttonContainerId',
        buttonSize: 'm',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonBorderRadius: '0',
        buttonIcon: 'ya',
      },
    ).then(({ handler }) => handler());
  };

  return { getToken, getYandexData };
};
