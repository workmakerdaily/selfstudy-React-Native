# React Native with Hooks
이 프로젝트는 React Native 환경에서 Hooks를 활용하여 상태 관리, 컴포넌트 생명 주기 관리 및 성능 최적화를 실습하는 과정을 다룹니다. 특히, `useState`, `useEffect`, `useRef`, `useMemo`와 같은 주요 Hook의 활용 방법과 커스텀 Hook을 만드는 과정을 안내합니다.

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
### 1. useState
컴포넌트의 상태를 관리하기 위해 useState를 사용합니다.
```javascript
const [count, setCount] = useState(0);
```

<br/>

### 2. useEffect
컴포넌트의 생명 주기에 따라 특정 작업을 수행합니다.
- 렌더링 시 작업 실행
- 특정 상태 변경 시 작업 실행
- 마운트 및 언마운트 시 작업 실행
```javascript
useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
}, []);
```

<br/>

### 3. useRef
컴포넌트 참조 및 DOM 접근에 활용합니다.
```javascript
const refName = useRef(null);

useEffect(() => {
    refName.current.focus();
}, []);
```

<br/>

### 4. useMemo
불필요한 연산을 방지하여 성능을 최적화합니다.
```javascript
const length = useMemo(() => text.length, [text]);
```

<br/>

### 5. 커스텀 Hook: useFetch
API 호출을 처리하는 재사용 가능한 Hook을 작성합니다.
```javascript
export const useFetch = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setInProgress(true);
                const res = await fetch(url);
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setInProgress(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, error, inProgress };
};
```
---
### 실행 화면 예시
#### 1.  Counter 컴포넌트

- 상태 관리와 업데이트를 실습합니다.
- 증가 및 감소 버튼 제공.

#### 2. Form 컴포넌트

- useEffect와 useRef를 활용한 동작 예제.
- 입력 필드에 포커스를 설정하고 상태를 모니터링.

#### 3.Length 컴포넌트

- useMemo를 통해 문자열 길이를 효율적으로 계산.

#### 4. Dog 컴포넌트

- useFetch를 사용해 강아지 이미지를 랜덤으로 로드.

---
### 설치 및 실행
### 1. 프로젝트 생성
```bash
expo init react-native-hooks
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
- 처음 배우는 리액트 네이티브(한빛미디어) 6장
---
### 해당 내용을 정리하며 작성한 블로그
- https://velog.io/@workmakerdaily/ReactNative-Hooks