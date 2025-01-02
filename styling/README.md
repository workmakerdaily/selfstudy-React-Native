# Styling
#### 프로젝트 생성
```bash
expo init react-native-style
```
src 폴더를 생성한 뒤 App 컴포넌트를 작성한다.
```javascript
import React from 'react';
import { View, Text } from 'react-native';

const App = () => {
    return (
        <View>
            <Text>React Native Style</Text>
        </View>
    );
}

export default App;
```
그리고 루트 디렉터리의 App.js를 다음과 같이 수정한다.
```javascript
import App from './src/App';

export default App;
```


### 인라인 스타일링
인라인 스타일링은 HTML의 인라인 스타일링처럼 컴포넌트에 직접 스타일을 입력하는 방식이다.
차이점은 HTML은 문자열 형태로 입력하지만 리액트 네이티브는 객체 형태로 전달한다.
```javascript
import React from 'react';
import { View, Text } from 'react-native';

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
            <Text
                style={{
                    padding: 10,
                    fontSize: 26,
                    fontWeight: '600',
                    color: 'black',
                }}
            >
                Inline Styling - Text
            </Text>
            <Text
                style={{
                    padding: 10,
                    fontSize: 26,
                    fontWeight: '400',
                    color: 'red',
                }}
            >
                Inline Styling - Error
            </Text>
        </View>
    );
}

export default App;
```
인라인 스타일링은 어떤 스타일이 적용되는지 잘 보인다는 장점이 있다.
하지만 비슷한 역할의 컴포넌트에 동일한 코드가 반복된다는 점과 해당 스타일이 적용된 이유를 코드만으로 명확하게 이해하기 어렵다는 단점이 있다.

### 클래스 스타일링
클래스 스타일링은 스타일시트에 정의된 스타일을 사용하는 방법이다.
스타일시트에 스타일을 정의하고 컴포넌트에서 정의된 스타일의 이름으로 적용하는 클래스 스타일링 방법은 CSS 클래스를 이용하는 방법과 유사하다.
```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Inline Styling - Text</Text>
            <Text style={styles.error}>Inline Styling - Error</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
    },
    error: {
        padding: 10,
        fontSize: 26,
        fontWeight: '400',
        color: 'red',
    },
})

export default App;
```

간단하게 화면을 확인하는 상황에서는 인라인 스타일을 사용하는 것이 편하지만, 장기적으로 생각하면 클래스 스타일을 사용하는 것이 관리 측면에서 유리하다.

### 여러 개의 스타일 적용
여러 개의 스타일을 적용해야 할 경우는 배열을 이용하여 style 속성에 여러 개의 스타일을 적용하면 된다.
```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Inline Styling - Text</Text>
            <Text style={[styles.text, styles.error]}>Inline Styling - Error</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
    },
    error: {
        fontWeight: '400',
        color: 'red',
    },
})

export default App;
```
여러 개의 스타일을 적용할 때에는 적용하는 스타일의 순서가 뒤에 오는 스타일이 앞에 있는 스타일을 덮는다는 것을 기억해야 한다.
만약 [styles.error, styles.text] 순서라면 글자 색이 검은색으로 된다.

### 외부 스타일 이용하기
상황에 따라 외부 파일에 스타일을 정의하고 여러 개의 파일에서 스타일을 공통으로 사용하는 경우가 있다.
src 폴더 밑에 styles.js 파일을 생성하고 다음과 같이 작성한다.
```javascript
import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const textStyles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
    },
    error: {
        fontWeight: '400',
        color: 'red',
    },
});
```
그리고 src 폴더의 App.js에 다음과 같이 적용한다.
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles } from './styles';

const App = () => {
    return (
        <View style={viewStyles.container}>
            <Text style={[textStyles.text, { color: 'green' }]}>
                Inline Styling - Text
            </Text>
            <Text style={[textStyles.text, textStyles.error]}>
                Inline Styling - Error
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
    },
    error: {
        fontWeight: '400',
        color: 'red',
    },
})

export default App;
```

# 리액트 네이티브 스타일
리액트 네이티브에는 많은 종류의 스타일 속성들이 있다.
그 중 특정 플랫폼에서만 적용되는 스타일도 있고 웹 프로그래밍에서 사용해본 속성들도 있다.

### flex와 범위
src 폴더 밑에 components 폴더를 생성하고 layout.js 파일을 components 폴더 안에 생성한 후 Header, Contents, Footer 컴포넌트를 정의할 것이다.
```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Header = () => {
    return (
        <View style={[styles.container, styles.header]}>
            <Text style={styles.text}>Header</Text>
        </View>
    );
};

export const Contents = () => {
    return (
        <View style={[styles.container, styles.contents]}>
            <Text style={styles.text}>Contents</Text>
        </View>
    );
};

export const Footer = () => {
    return (
        <View style={[styles.container, styles.footer]}>
            <Text style={styles.text}>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
    },
    header: {
        backgroundColor: '#f1c40f',
    },
    contents: {
        backgroundColor: '#1abc9c',
        height: 640,
    },
    footer: {
        backgroundColor: '#3498db',
    },
    text: {
        fontSize: 26,
    },
});
```
그리고 App 컴포넌트에서 세 개의 컴포넌트를 사용할 수 있도록 한다.
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles } from './styles';
import { Header, Contents, Footer } from './components/Layout';

const App = () => {
    return (
        <View style={viewStyles.container}>
            <Header />
            <Contents />
            <Footer />
        </View>
    );
};

export default App;
```
서로 화면의 크기가 다른 핸드폰 기종으로 확인하면 다른 모습으로 보일 수 있다.
고정값을 이용하면 기기마다 화면 크기의 차이 때문에 서로 다른 모습으로 나타나고 이런 다양한 크기의 기기에 대응하기 어렵다.
이때 flex를 이용하여 문제를 해결할 수 있다.
flex는 width, height와 달리 항상 비율로 크기가 설정된다.
flex는 값으로 숫자를 받으며 값이 0일 때는 width, height 값에 따라 크기가 결정되고, 양수인 경우 flex 값에 비례하여 크기가 조정된다ㅓ.

flex가 1일 때는 자신이 차지할 수 있는 영역을 모두 차지한다.
동일한 부모 컴포넌트에 있는 컴포넌트 두 개의 flex 값이 각각 1과 2로 되어 있다면, 두 개의 컴포넌트 비율이 1:2가된다. 
```javascript
    header: {
        flex: 1,
        backgroundColor: '#f1c40f',
    },
    contents: {
        flex: 2,
        backgroundColor: '#1abc9c',
        height: 640,
    },
    footer: {
        flex: 1,
        backgroundColor: '#3498db',
    },
```
위와 같이 수정하면 1:2:1의 비율로 나누어 채워진다.

Header 컴포넌트와 Footer 컴포넌트의 높이는 80으로 고정하고 Contents 컴포넌트가 나머지 부분을 모두 차지하도록 설정할 것이다.

### 정렬
#### flexDirection
화면을 구성할 때 컴포넌트가 쌓이는 방향을 변경하고 싶을 때는 flexDirection을 이용하면 된다.
> ### flexDirection 설정 값
- **column**: 세로 방향으로 정렬(기본값)`
- **column-reverse**: 세로 방향 역순 정렬
- **row**: 가로 방향으로 정렬
- **row-reverse**: 가로 방향 역순 정렬

#### justifyContent
컴포넌트를 배치할 방향을 결정한 후 방향에 따라 정렬하는 방식을 결정하는 속성이 justifyContent와 alignItems이다.
**justifyContent**는 flexDirection에서 결정한 방향과 동일한 방향으로 정렬하는 속성이고,
**alignItems**sms flexDirection에서 결정한 방향과 수직인 방향으로 정렬하는 속성이다.

> ### flexDirection이 row일 때 justifyContent의 설정 값
- **flex-start**: 시작점에서부터 정렬(기본값)
- **flex-end**: 끝에서부터 정렬
- **center**: 중앙 정렬
- **space-between**: 컴포넌트 사이의 공간을 동일하게 만들어서 정렬
- **space-around**: 컴포넌트 각각의 주변 공간을 동일하게 만들어서 정렬
- **space-evenly**: 컴포넌트 사이와 양 끝에 동일한 공간을 만들어서 정렬

#### alignItems
flexDirection에서 정한 방향과 수직이 되는 방향으로 정렬할 때 사용하는 속성이다.

> ### alignItems에 설정할 수 있는 값
- **flex-start**: 시작점에서부터 정렬(기본값)
- **flex-end**: 끝에서부터 정렬
- **center**: 중앙 정렬
- **stretch**: alignItems의 방향으로 컴포넌트 확장
- **baseline**: 컴포넌트 내부의 텍스트 베이스라인을 기준으로 

### 그림자
> ### 리액트 네이티브 그림자 관련 설정 스타일 속성
- **shadowColor**: 그림자 색 설정
- **shadowOffset**: width와 height 값을 지정하여 그림자 거리 설정
- **shadowOpacity**: 그림자의 불투명도 설정
- **shadowRadius**: 그림자의 흐림 반경 설정

이 속성들은 iOS에만 적용되는 속성들이다.

안드로이드에서 그림자를 표현하려면 elevation을 사용해야 한다.

각 플랫폼마다 정용 여부가 다른 속성이 있을 때에는 리액트 네이티브에서 제공하는 Platform 모듈을 이용해 각 플랫폼마다 다른 코드가 적용되도록 코드를 작성할 수 있다.

components 폴더 밑에 ShadowBox.js 파일을 생성하고 Platform을 사용하여 그림자 박스를 만들 것이다.
```javascript
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

export default () => {
    return <View style={styles.shadow}></View>
};

const styles = StyleSheet.create({
    shadow: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 20,
            },
        }),
    },
});
```
만든 컴포넌트를 App 컴포넌트에 적용시킨다.
```javascript
const App = () => {
    return (
        <View style={viewStyles.container}>
            <ShadowBox />
        </View>
    );
};

export default App;
```

<br/>

---

# 스타일드 컴포넌트
스타일드 컴포넌트의 기능을 활용하면 이점들을 많이 얻을 수 있어 더 편하게 개발할 수 있다.
```bash
npm install styled-components
# 버전이 맞지 않아 아래로 했다. 충돌이 발생할 수 있다.
npm install styled-components --legacy-peer-deps
```
스타일드 컴포는터는 자바스크립트 파일 안에 스타일을 작성하는 CSS-in-JS 라이브러리이다.

### 스타일드 컴포넌트 사용법
태그드 템플릿 리터럴 문법을 사용한다.
```javascript
import styled from 'styled-components/native';

const MyTextComponent = styled.Text`
	color: #fff;
`;
```
styled 뒤에 작성하는 컴포넌트의 이름은 반드시 존재하는 컴포넌트를 지정해야 한다.
스타일드 컴포넌트에서는 css를 이용하여 재사용 가능한 코드를 관리할 수 있다.
```javascript
import styled, { css } from 'styled-components/native';

const whiteText = css`
	color: #fff;
	font-size: 14px;
`;
const MyBoldTextComponent = styled.Text`
	${whiteText}
	font-weight: 600;
`;
const MyLightTextComponent = styled.Text`
	${whiteText}
	font-weight: 200;
`;
```
재사용 가능한 스타일 코드를 관리하는 방법 외에 완성된 컴포넌트를 상속받아 이용하는 방법 도 있다.
```javascript
import styled from 'styled-components/native';

const StyledText = styled.Text`
	color: #000;
	fonst-size: 20px;
	margin: 10px;
	padding: 10px;
`;
const ErrorText = styled(StyledText)`
	fonst-weight: 600;
	color: red;
`;
```

### 스타일 적용하기
components 폴더에 Button.js 파일을  생성하고 스타일 컴포넌트를 이용해 작성할 것이다.
```javascript
import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
    background-color: #9b59b6;
    border-radius: 15px;
    padding: 15px 40px;
    margin: 10px 0px;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color:  #fff;
`;

const Button = props => {
    return (
        <ButtonContainer>
            <Title>{props.title}</Title>
        </ButtonContainer>
    );
};

export default Button;

```
스타일드 컴포넌트를 사용하면 역할에 맞는 이름을 지정할 수 있다는 장점이 있다.
완성된 컴포넌트를 App 컴포넌트에 사용할 것이다.
```javascript
const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
`;

const App = () => {
    return (
        <Container>
            <Button title="Hanbit" />
            <Button title="React Native" />
        </Container>
    );
};

export default App;
```
스타일드 컴포넌트와 스타일시트를 사용한 것의 가장 먼저 보이는 차이는 카멜 표기법으로 표기되는 스타일 속성과 하이픈 형태의 스타일 속성이다.

### props 사용하기
props로 전달되는 title의 값이 Hanbit인 경우 바탕색을 다르게 표현하고 싶다면 다음과 같이 하면 된다.
```javascript
const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props =>
        props.title === 'Habit' ? '#3498db' : '#9b59b6'};
    border-radius: 15px;
    padding: 15px 40px;
    margin: 10px 0px;
    justify-content: center;
`;

...

const Button = props => {
    return (
        <ButtonContainer title={props.title}>
            <Title>{props.title}</Title>
        </ButtonContainer>
    );
};
```

### attrs 사용하기
스타일 컴포넌트를 이용하면 스타일을 작성하는 곳에서 컴포넌트의 속성도 설정할 수 있다.
또한 속성을 설정할 때 props를 이용하여 값에 따라 속성을 변경할 수 있다.

componets 폴더에 Input.js 파일을 생성하고 다음과 같이 작성한다.
```javascript
import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
    width: 200px;
    height: 60px;
    margin: 5px;
    padding: 10px;
    border-radius: 10px;
    border: 2px;
    border-color: #3498db;
    font-size: 24px;
`;

const Input = () => {
    return <StyledInput placeholder="Enter a text..." placeholderTextColor='#3498db' />
};

export default Input;
```
작성한 Input 컴포넌트를 App 컴포넌트에서 사용해본다.
```javascript
const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
`;

const App = () => {
    return (
        <Container> 
            <Button title="Hanbit" />
            <Button title="React Native" />
            <Input />
        </Container>
    );
};

export default App;
```
이제 attrs를 이용하여 props로 전달된 borderColor 값에 따라 Input 컴포넌트 디자인이 변경되도록 수정할 것이다.
```javascript
import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs(props => ({
    placeholder: 'Enter a text...',
    placeholderTextColor: props.borderColor,    
}))`
    width: 200px;
    height: 60px;
    margin: 5px;
    padding: 10px;
    border-radius: 10px;
    border: 2px;
    border-color: ${props => props.borderColor};
    font-size: 24px;
`;

const Input = props => {
    return <StyledInput borderColor={props.borderColor} />
};

export default Input;
```
수정 후 App 컴포넌트에서 Input 컴포넌트를 사용하면서 borderColor 값을 전달하도록 수정할 것이다.
```javascript
const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
`;

const App = () => {
    return (
        <Container> 
            <Button title="Hanbit" />
            <Button title="React Native" />
            <Input borderColor='#3498db' />
            <Input borderColor='#9b59b6' />
        </Container>
    );
};

export default App;
```
attrs를 이용하면 스타일을 설정하는 곳에서 props의 값에 따라 컴포넌트의 속성을 다르게 적용할 수 있고 항상 일정한 속성을 미리 정의해놓을 수도 있다.

### ThemeProvider
ThemeProvider는 Context API를 활용해 애플리케이션 전체에서 스타일드 컴포넌트를 이용할 때 미리 정의한 값들을 사용할 수 있도록 props로 전달한다.

src 폴더 안에 theme.js 파일을 생성하고 Button 컴포넌트에서 사용했던 색을 정의한다.
```javascript
export const theme = {
    purple: '#9b59b6',
    blue: '#3498db',
};
```
ThemeProvider를 최상위 컴포넌트로 사용하여 ThemeProvider 컴포넌트의 자식 컴포넌트에서는 스타일드를 이용할 때 props로 theme을 전달받아 미리 정의된 색을 사용할 수 있다.
```javascript
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Button title="Hanbit" />
                <Button title="React Native" />
                <Input borderColor='#3498db' />
                <Input borderColor='#9b59b6' />
            </Container>
        </ThemeProvider>
    );
};

export default App;
```
```javascript
const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props =>
        props.title === 'Hanbit' ? props.theme.blue : props.theme.purple};
    border-radius: 15px;
    padding: 15px 40px;
    margin: 10px 0px;
    justify-content: center;
`;
```
이렇게 하면 전과 동일하게 나타난다.

이번에는 ThemeProvider를 이용해 애플리케이션의 색 테마를 변경하도록 할 것이다.
```javascript
export const lightTheme = {
    background: '#ffffff',
    text: '#ffffff',
    purple: '#9b59b6',
    blue: '#3498db',
};

export const darkTheme = {
    background: '#34495e',
    text: '#34495e',
    purple: '#9b59b6',
    blue: '#3498db',
};
```
이제 App 컴포넌트에 테마를 변경할 수 있는 스위치를 추가하고, 테마에 따라 다른 색이 되도록 할 것이다.
```javascript
const Container = styled.View`
    flex: 1;
    background-color:${props => props.theme.background};
    align-items: center;
    justify-content: center;
`;

const App = () => {

    const [isDark, setIsDark] = useState(false);
    const _toggleSwitch = () => setIsDark(!isDark);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Container>
                <Switch value={isDark} onValueChange={_toggleSwitch} />
                <Button title="Hanbit" />
                <Button title="React Native" />
                <Input borderColor='#3498db' />
                <Input borderColor='#9b59b6' />
            </Container>
        </ThemeProvider>
    );
};

export default App;
```
Button 컴포넌트에서도 theme의 변화에 따라 값이 잘 바뀌는지 확인하기 위해 Title 컴포넌트의 스타일을 수정한다.
```javascript
const Title = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.text};
`;
```

