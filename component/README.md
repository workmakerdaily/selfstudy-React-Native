# JSX
JSX는 객체 생성과 함수 호출을 위한 문법적 편의를 제공하기 위해 만들어진 확장 기능으로 리액트 프로젝트에서 사용된다.
가독성이 높고 작성하기도 쉬우며 XML과 유사하여 중첩된 구조를 잘 나타낼 수 있다.

### 하나의 부모
JSX에서는 여러 개의 요소를 표현 할 경우 반드시 하나의 부모로 감싸야 한다.
```javascript
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```
앞에서 사용되는 View는 UI를 구성하는 가장 기본적인 요소이며 <div\>와 비슷한 역할을 하는 컴포넌트이다.
View 컴포넌트처럼 특정 역할을 하는 컴포넌트로 감싸지 않고 여러 개의 컴포넌트를 반환하고 싶은 경우 Fragment 컴포넌트를 사용한다.
```javascript
export default function App() {
  return (
    <Fragment>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </Fragment>
  );
}
```
Fragment 컴포넌트는 단축 문법을 제공한다.
```javascript
export default function App() {
  return (
    <>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </>
  );
}
```

### 자바스크립트 변수
JSX는 내부에서 자바스크립트의 변수를 전달하여 이용할 수 있다.
```javascript
export default function App() {

  const name = 'Seyeon';

  return (
    <View style={styles.container}>
      <Text>My name is {name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  }
});

```
화면에 본인이 설정한 name 변수의 값이 나타난다.

### 자바스크립트 조건문

#### if 조건문
if 문을 즉시실행함수 형태로 작성해야 한다.
```javascript
export default function App() {

  const name = 'Seyeon';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {(() => {
          if (name === 'Seyeon') return 'My name is Seyeon';
          else if (name === 'Kim') return 'My name is Kim';
          else return 'My name is React Native';
        })()}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

#### 삼항 연산자
if 조건문 외에도 삼항 연산자를 사용할 수 있다.
```javascript
export default function App() {

  const name = 'Seyeon';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        My name is {name === 'Seyeon' ? 'Seyeon Kim' : 'React Native'}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

#### AND, OR 연산자
AND 연산자와 OR 연산자를 잘 이용하면 특정 조건에 따라 컴포넌트의 렌더링 여부를 결정하도록 코드를 구성할 수 있다.
```javascript
export default function App() {

  const name = 'Seyeon';

  return (
    <View style={styles.container}>
      {name === 'Seyeon' && (
        <Text style={styles.text}>My name is Seyeon</Text>
      )}
      {name !== 'Seyeon' && (
        <Text style={styles.text}>My name is not Seyeon</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
```
JSX에서 false는 렌더링되지 않기 때문에 AND 연산자 앞의 조건이 참일 때 뒤의 내용이 나타나고, 거진인 경우 나타나지 않는다.
OR 연산자는 앞의 조건이 거짓인 경우 내용이 나타나고, 조건이 참인 경우 나타나지 않는다.

### null과 undefined
JSX의 경우 null은 허용하지만 undefined는 오류가 발생한다.

### 주석
자바스크립트처럼 //나 {/**/} 주석을 사용한다.

### 스타일링
JSX에서는 HTML과 달리 style에 문자열로 입력하는 것이 아니라 객체 형태로 입력해야 한다.
```javascript
export default function App() {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
```

<br/>

---

# 컴포넌트
컴포넌트란 재사용이 가능한 조립 블록으로 화면에 나타나는 UI 요소이다.
App.js 파일도 컴포넌트이다.
단순히 UI 역할만 하는 것이 아니라 부모로부터 받은 속성이나 자신의 상태에 따라 표현이 달라지고 다양한 기능을 수행한다.

### 내장 컴포넌트
리액트 네이티브에서는 다양한 내장 컴포넌트들이 제공된다.
Button 컴포넌트를 사용하여 title과 onPress 속성을 지정해볼 것이다.
src폴더를 생성 후 App.js 파일을 생성한다.
```javascript
import React from 'react';
import { Text, View, Button } from 'react-native';

const App = () => {
    return (
        <View
        style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Button Component</Text>
            <Button title="Button" onPress={() => alert('Click !!!')} />
        </View>
    );
};

export default App;
```
그리고 프로젝트 루트 디렉터리의 App.js 파일을 작성한 App 컴포넌트를 사용하도록 수정한다.
```javascript
import App from "./src/App";

export default App;
```
Button 컴포넌트의 color 속성은 iOS에서는 텍스트 색을 나타내는 값이지만 안드로이드에서는 버튼의 바탕색을 나타내는 값이다.
iOS와 안드로이드가 다르게 표현되거나 특정 플랫폼에만 적용되는 속성이 있다.
한 플랫폼만 테스트하는 것이 아니라 iOS와 안드로이드 모두 확인하면서 개발하는 것이 좋다.

### 커스텀 컴포넌트 만들기
앞에서 사용한 Button 컴포넌트는 iOS와 안드로이드에서 다른 모습으로 렌더링된다는 단점이 있다. 그 단점을 보안하기 위해 TouchableOpacity 컴포넌트와 Text 컴포넌트를 이용해서 Button 컴포넌트를 대체한 MyButton 컴포넌트를 만들 것이다.

src폴더 안에 components폴더를 만든 후 그 안에 MyButton.js 파일을 생성한다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MyButton = () => {
    return (
        <TouchableOpacity>
            <Text style={{ fontSize: 24 }}>MyButton</Text>
        </TouchableOpacity>
    );
};

export default MyButton;
```
그리고 src 폴더의 App.js를 다음과 같이 수정한다.
```javascript
import React from 'react';
import { Text, View, Button } from 'react-native';
import MyButton from './components/MyButton';

const App = () => {
    return (
        <View
        style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>My Button Component</Text>
            <MyButton />
        </View>
    );
};

export default App;
```
이제 스타일을 수정하고 클릭에 대한 행동을 설정할 것이다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MyButton = () => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        onPress={() => alert('Click !!!')}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>MyButton</Text>
        </TouchableOpacity>
    );
};

export default MyButton;
```

<br/>

---

# props와 state
props와 state는 컴포넌트가 UI뿐만 아니라 다양한 기능을 담당할 수 있도록 하여 더욱 다양한 역할을 수행할 수 있도록 해준다.

### props
properties를 줄인 표현으로, 부모 컴포넌트로부터 전달된 속성값 혹은 상속받은 속성값을 말한다.
자식 컴포넌트에서는 해당 props를 사용할 수 있지만 변경하는 것은 불가능하다.


#### props 전달하고 사용하기
App 컴포넌트에서 MyButton 컴포넌트에 title이라는 속성을 입력해 사용한다.
```javascript
import React from 'react';
import { Text, View, Button } from 'react-native';
import MyButton from './components/MyButton';

const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Props</Text>
            <MyButton title={Button} />
        </View>
    );
};

export default App;
```
App 컴포넌트에서 My Button 컴포넌트를 호출할 때 title 속성에 Button이라는 문자열로 전달했다.

props로 전달된 title을 이용해서 버튼에 출력되는 문자열을 변경해볼 것이다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MyButton = props => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        onPress={() => alert('Click !!!')}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default MyButton;
```
부모 컴포넌트에서 자식 컴포넌트를 사용하면서 속성을 props를 전달하는 방법 외에 컴포넌트의 태그 사이에 값을 입력해서 전달하는 방법도 있다.
```javascript
const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Props</Text>
            <MyButton title='Button' />
            <MyButton title='Button'>Children Props</MyButton>
        </View>
    );
};
```
컴포넌트의 태그 사이에 전달된 값은 자식 컴포넌트의 props에 children으로 전달된다.
```javascript
const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Props</Text>
            <MyButton title='Button' />
            <MyButton title='Button'>Children Props</MyButton>
        </View>
    );
};
```

#### defaultProps
```javascript
const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Props</Text>
            <MyButton title='Button' />
            <MyButton title='Button'>Children Props</MyButton>
            <MyButton />
        </View>
    );
};
```
이렇게 하면 아무 이름 없이 파란 네모만 나오게 된다.
이런 상황에서 기본값을 defaultProps로 지정하면 빈 값이 나타나는 사오항을 방지할 수 있다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MyButton = props => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        onPress={() => alert('Click !!!')}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>
                {props.children ||  props.title}
                </Text>
        </TouchableOpacity>
    );
};

MyButton.defaultProps = {
    title: 'Button',
};

export default MyButton;
```

#### propTypes
잘못된 props가 전달되었다는 것을 경고 메시지를 통해 알리는 방법으로 PropTypes를 사용할 수 있다.
PropTypes를 사용하여 props의 타입과 필수 여부를 지정할 수 있다.

PropTypes를 사용하려면 라이브러리를 추가로 설치해야 한다.
```bash
npm install prop-types
```
MyButton 컴포넌트를 수정해볼 것이다.
```javascript
const MyButton = props => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        onPress={() => alert('Click !!!')}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>
                {props.children ||  props.title}
                </Text>
        </TouchableOpacity>
    );
};

MyButton.defaultProps = {
    title: 'Button',
};

MyButton.propTypes = {
    title: PropTypes.number,
};

export default MyButton;
```
title에 전달되어야 하는 값의 타입이 숫자여야 한다고 지정했다.

그럼 다음과 같은 에러가 뜬다.
>
Warning: Failed prop type: Invalid prop title of type string supplied to MyButton, expected number.

title의 타입을 문자열로 변경하면 경고 메시지가 나타나지 않게된다.

필수 여부를 지정하는 방법은 선언된 타입 뒤에 isRequired를 붙여주면 된다.
```javascript
MyButton.propTypes = {
    title: PropTypes.string.isRequired,
};
```
defaultProps에서 title의 기본값을 설정하면 title이 전달되지 않아도 경고 메시지가 나타나지 않는다.

### state
state는 컴포넌트 내부에서 생성되고 값을 변경할 수 있다.
state란 컴포넌트에서 변화할 수 있는 값을 나타내며, 상태가 변하면 컴포넌트는 리렌더링 된다.

### useState
리액트 Hooks 중 useState는 함수형 컴포넌트에서 상태를 관리할 수 있도록 해준다
```javascript
const [state, setState] = useState(initialState);
```
useState는 상태를 관리하는 변수와 그 변수를 변경할 수 있는 세터함수를 배열로 반환한다.

components 폴더 밑에 Counter.js를 생성하고 useState로 Counter 컴포넌트를 만들어볼 것이다.
```javascript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';

const Counter = () => {

    const [count, setCount] = useState (0);

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 30, margin: 10 }}>{count}</Text>
            <MyButton title="+1" onPress={() => setCount(count + 1)} />
            <MyButton title="-1" onPress={() => setCount(count - 1)} />
        </View>
    );
};

export default Counter;
```
MyButton에서 onPress를 필수로 지정해주고
onPress={() => props.onPress()} 이렇게 변경해둔다.

App 컴포넌트에서 새로 생성한 Counter 컴포넌트를 불러온다.
```javascript
import React from 'react';
import { Text, View, Button } from 'react-native';
import MyButton from './components/MyButton';
import Counter from './components/Counter';

const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Counter />
        </View>
    );
};

export default App;
```

#### 여러 개의 useState
컴포넌트에서 관리해야 하는 상태가 여러 개일 때, useState를 여러번 사용하는 것도 가능한다.
```javascript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';

const Counter = () => {

    const [count, setCount] = useState(0);
    const [double, setDouble] = useState(0);

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30, margin: 10 }}>count: {count}</Text>
            <Text style={{ fontSize: 30, margin: 10 }}>double: {double}</Text>
            <MyButton
                title="+"
                onPress={() => {
                    setCount(prevCount => {
                        const newCount = prevCount + 1;
                        // 새로운 count 값을 기반으로 double 설정
                        setDouble(newCount * 2);
                        return newCount;
                    });
                }}
            />
            <MyButton
                title="-"
                onPress={() => {
                    setCount(prevCount => {
                        const newCount = prevCount - 1;
                        // 새로운 count 값을 기반으로 double 설정
                        setDouble(newCount * 2);
                        return newCount;
                    });
                }}
            />
        </View>
    );
};

export default Counter;
```

<br/>

---

# 이벤트
리액트 네이티브는 사용자의 행동에 따라 상호 작용하는 이벤트를 다양하게 제공한다.

### press 이벤트
리액트 네이티브에서 onClick 이벤트와 가장 비슷한 이벤트는 press 이벤트이다.

> ### TouchableOpacity 컴포넌트에서 설정할 수 있는 Press 이벤트의 종류
- **onPressIn**: 터치가 시작될 때 항상 호출
- **onPressOut**: 터치가 해제될 때 항상 호출
- **onPress**: 터치가 해체될 때 onPressOut 이후 호출
- **onLongPress**: 터치가 일정 시간 이상 지속되면 호출

components 폴더에 EventButton.js 파일을 생성하고 다음과 같이 작성한다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const EventButton = () => {

    const _onPressIn = () => console.log('Press In !!!\n');
    const _onPressOut = () => console.log('Press Out !!!\n');
    const _onPress = () => console.log('Press !!!\n');
    const _onLongPress = () => console.log('Long Press !!!\n');

    return (
        <TouchableOpacity
        style={{
            backgroundColor: '#f1c40f',
            padding: 16,
            margin: 10,
            borderRadius:8,
        }}
        onPressIn={_onPressIn}
        onLongPress={_onLongPress}
        onPressOut={_onPressOut}
        onPress={_onPress}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>Press</Text>
        </TouchableOpacity>
    );
};

export default EventButton;
```
작성한 EventButton 컴포넌트를 App 컴포넌트에 사용한다.
```javascript
const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <EventButton />
        </View>
    );
};

export default App;
// (NOBRIDGE) LOG  Press In !!!
// (NOBRIDGE) LOG  Press Out !!!
// (NOBRIDGE) LOG  Press !!!
// (NOBRIDGE) LOG  Long Press !!!
```
만약 onLongPress가 호출되는 시간을 조절하고 싶으면 delayLongPress의 값을 조절하여 원하는 시간으로 설정할 수 있다.
```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const EventButton = () => {

    const _onPressIn = () => console.log('Press In !!!\n');
    const _onPressOut = () => console.log('Press Out !!!\n');
    const _onPress = () => console.log('Press !!!\n');
    const _onLongPress = () => console.log('Long Press !!!\n');

    return (
        <TouchableOpacity
      	...
        delayLongPress={3000}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>Press</Text>
        </TouchableOpacity>
    );
};

export default EventButton;
```
delayLongPrss의 값을 3000으로 변경하면 3초 동안 클릭하고 있어야 onLongPress가 호출된다.

### change 이벤트
변화를 감지하는 change 이벤트는 값을 입력하는 TextInput 컴포넌트에서 많이 사용된다.
components 폴더 밑에 EventInput.js 파일을 생성한다.
#### onChange 사용
```javascript
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const EventInput = () => {
    const [text, setText] = useState('');

    const _onChange = event => {
        setText(event.nativeEvent.text);
    };

    return (
        <View>
            <Text style={{ margin: 10, fontSize: 30 }}>text: {text}</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, fontSize: 20 }}
                placeholder="Enter a text..."
                onChange={_onChange}
            />
        </View>
    );
};

export default EventInput;
```
#### onChangeText 사용
```javascript
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const EventInput = () => {
    
    const [text, setText] = useState('');

    return (
        <View>
            <Text style={{ margin: 10, fontSize: 30 }}>text: {text}</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, fontSize: 20 }}
                placeholder="Enter a text..."
                onChangeText={setText}
            />
        </View>
    );
};

export default EventInput;

```
그리고 App 컴포넌트를 수정한다.
```javascript
const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <EventButton />
            <EventInput />
        </View>
    );
};

export default App;
```

### Pressable 컴포넌트
리액트 네이티브 0.63 버전부터 기존의 TouchableOpacity 컴포넌트를 대체하는 Pressable 컴포넌트가 추가되었다.
Pressable 컴포넌트가 더 다양한 기능을 제공한다.

Pressable 컴포넌트는 TouchableOpacity 컴포넌트처럼 사용자의 터치에 상호 작용하는 컴포넌트이다.
Pressable 컴포넌트에서 지원하는 기능 중 기존의 컴포넌트와의 차이는 **HitReact**와 **PressReact**이다.

**HitReact**는 버튼 모양보다 약간 떨어진 부분까지 이벤트가 발생할 수 있도록 설정해준다.
**PressReact**는 버튼을 클릭했을 때 해당 버튼이 동작하지 않게 하기 위해 버튼을 누른 상태에서 손가락을 얼마나 멀어지게 해야 벗어났다고 판단하는 지를 개발자가 조절하기 편하도록 해준다.

Pressable 컴포넌트를 사용하려면 다음 명령어를 입력해야한다.
```bash
npm install -g react-native-cli
npx @react-native-community/cli init RNPressable
# 둘 중 무엇을 해서 된건지 잘 모르겠다...
npm install -g expo-cli
expo init RNPressable
```


그리고 App.js에 다음과 같이 작성한다.
```javascript
import React from 'react';
import { Text, View, Pressable } from 'react-native';

const Button = (props) => {
    return (
        <Pressable
        style={{ padding:10, backgroundColor: '#1abc9c' }}
        onPressIn={() => console.log('Press In')}
        onPressOut={() => console.log('Press Out')}
        onPress={() => console.log('Press')}
        onLongPress={() => console.log('Long Press')}
        delayLongPress={3000}
        pressRetentionOffset={{bottom:50, left: 50, right: 50, top: 50}}
        hitSlop={50}>
            <Text style={{ padding:10, fontSize:30 }}>{props.title}</Text>
        </Pressable>
    )
}

const App = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button title='Pressable' />
        </View>
    );
};

export default App;
```