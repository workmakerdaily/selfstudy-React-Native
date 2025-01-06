# React Native with Context API
이 프로젝트는 React Native에서 Context API를 활용하여 전역 상태를 관리하고, 데이터를 효율적으로 공유 및 수정하는 방법을 다룹니다. `Context API`를 사용하는 기본적인 예제부터, `useContext Hook`을 활용한 간결한 코드 작성 방법까지 실습할 수 있습니다.

---
### 프로젝트 구조
```
Project/
│
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Counter.js
│   │   ├── Form.js
│   │   ├── Length.js
│   │   └── Dog.js
│   ├── hooks/
│   │   └── useFetch.js
│   └── App.js
│
├── App.js
└── package.json
```
---
### 주요 기능
### 1. Context API로 전역 상태 관리
Context API를 사용하여 데이터를 전역적으로 관리하고, 여러 컴포넌트에서 데이터를 쉽게 공유합니다.
```javascript
import { createContext } from "react";

const UserContext = createContext({ name: 'Seyeon Kim' });
export default UserContext;
```

<br/>

### 2. Consumer로 데이터 사용
`Consumer` 컴포넌트를 통해 가장 가까운 `Provider`에서 데이터를 받아 사용할 수 있습니다.
```javascript
import UserContext from "../contexts/User";

const User = () => {
    return (
        <UserContext.Consumer>
            {value => <Text>Name: {value.name}</Text>}
        </UserContext.Consumer>
    );
};
```

<br/>

### 3. Provider로 데이터 전달
`Provider`를 사용해 하위 컴포넌트에 데이터를 전달하며, 필요한 경우 상태를 변경할 수 있도록 설정합니다.
```javascript
const UserProvider = ({ children }) => {
    const [name, setName] = useState('Seyeon Kim');
    const value = { user: { name }, dispatch: setName };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
```

<br/>

### 4. useContext로 간결한 코드 작성
`useContext` Hook을 사용하면 `Consumer`를 사용하는 것보다 더 간결하게 데이터를 접근할 수 있습니다.
```javascript
import React, { useContext } from "react";
import UserContext from "../contexts/User";

const User = () => {
    const { user } = useContext(UserContext);
    return <Text>Name: {user.name}</Text>;
};
```

<br/>

### 5. 상태 수정 컴포넌트
사용자가 입력한 값을 Context의 상태로 반영하는 `Input` 컴포넌트를 작성합니다.
```javascript
const Input = () => {
    const [name, setName] = useState('');
    const { dispatch } = useContext(UserContext);

    return (
        <TextInput
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => {
                dispatch(name);
                setName('');
            }}
            placeholder="Enter a name..."
        />
    );
};
```
---
### 실행 화면 예시
### 1. User 컴포넌트
- 전역 상태(Context)에 저장된 이름을 표시합니다.
### 2. Input 컴포넌트
- 사용자가 입력한 값을 Context의 상태로 업데이트합니다.
---
### 설치 및 실행
### 1. 프로젝트 생성
```bash
expo init react-native-context
```

### 2. 패키지 설치
```bash
npm install styled-components
```
### 3. 앱 실행
```bash
npm start
```
---
### 참고 자료
- 처음 배우는 리액트 네이티브(한빛미디어) 7장
---
### 해당 내용을 정리하며 작성한 블로그
- https://velog.io/@workmakerdaily/ReactNative-Context-API