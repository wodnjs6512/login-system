## Getting Started

```bash
# install dependency
npm install
# or
yarn

npm run dev
# or
yarn dev
```

## 구현 범위 :

A +B + C 전부 구현 되어있습니다.

현재 구현된 부분들은 디자인을 배제하여서 구현하였으며, 미디어 쿼리를 이용하여, 기본 태블릿 사이즈의 경우에 대하여 **햄버거 메뉴**를 사용, Gnb를 구성 하였습니다.(768 기준)

확장시에 대하여 성능 향상을 위하여 **SSR**사용이 가능한 **React + Next.JS**를 사용하였으며 각각의 함수들에 대하여는 re-render시의 재정의를 최소화 하기위하여 hooks를 적극 사용 하였습니다.

또한 CSS 와 관련하여서 추후 확장성과 간결함을 유지 하기위해서 global-css 사용에 더하여 **emotion.js**를 활용, style in JS를 통하여 관리의 용이함을 추구 하였습니다.

구조적으로는 아토믹 디자인을 사용하여서 각각의 모듈의 재활용성을 높이려 하였으나, 해당 과제에서는 크게 컴포넌트까지 만들어서 재사용을 할만한 부분이 보이지 않았습니다. 다만, 디자인 방향성을 명시 하기 위해 구조에 1~2개정도의 컴포넌트를 넣어두었습니다.

상태관리툴은 Redux를 사용하기보다는 개발 테스트용이고, depth가 많지 않기에, 가볍게 가기위해서 **HOC**로 **useReducer**훅을 사용하였습니다.

## Step By Step

Use-Case로 이메일 입력시, 해당 이메일에 대한 issueToken은 메일로 온다는것을 가정, 개발용으로 개발자 콘솔에

뜨도록 하였고, 로그인시에 필요하다 생각되어 Cookie를 이용하여 아이디 저장도 추가하였습니다.

그리고, Regex 체크를 활용하여서 비밀번호 강도 확인 또한 구현하였습니다.

## testing

Jest 를 사용하였으며, 현재의 구현과 동일한 방법등을 이용하여서 기능 테스트 등도 활용할수 있습니다. 지금은 기본적인 테스팅만을 사용하였습니다.

```bash
yarn test
# or
 yarn test:watch
```

로 실행 할 수 있습니다.

다만, 더 나은 단계의 테스팅을 위해서는 QAWolf 와 같은것을 사용하면 편하지만, 해당 툴은 더 많은 복잡한 테스팅에 용이하기때문에 해당 테스트에 사용하기에 너무 무겁다고 생각하였습니다.
