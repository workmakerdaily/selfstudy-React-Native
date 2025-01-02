# 할 일 관리
- **등록**: 할 일 항목을 추가하는 기능
- **수정**: 완료되지 않은 할 일 항목을 수정하는 기능
- **삭제**: 할 일 항목을 삭제하는 기능
- **완료**: 할 일 항목의 완료 상태를 관리하는 기능

# 프로젝트 준비
### 프로젝트 생성
```bash
expo init react-native-todo
```
### 스타일드 컴포넌트 라이브러리, prop-types 라이브러리 설치
```bash
npm install styled-components prop-types
# 전자가 안되어 후자로 설치했다.
npm install styled-components prop-types --legacy-peer-deps
```
src 폴더에 theme.js 파일을 생성하고 색을 정의한다.
```javascript
export const theme = {
    background: '#101010',
    itemBackground: '#313131',
    main: '#778bdd',
    text: '#cfcfcf',
    done: '#616161',
};
```
그리고 src 폴더에 App.js 파일을 생성 후 작성한다.
```javascript
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: center;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container></Container>
        </ThemeProvider>
    );
}
```
그리고 루트 디렉터리의 App.js를 다음과 같이 작성한다.
```javascript
import App from "./src/App";

export default App;
```

그리고 컴포넌트를 관리할 components 폴더를 src 밑에 생성한다.

# 타이틀 만들기
App 컴포넌트에 Tltle 컴포넌트를 만든다.
```javascript
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Title>TODO List</Title>
            </Container>
        </ThemeProvider>
    );
}
```

### SafeAreaView 컴포넌트
iOS에서 아이폰의 노치 디자인이 있는 기기는 Title 컴포넌트의 일부가 가려지는 것을 볼 수 있다. 
리액트 네이티브에서는 자동으로 padding 값이 적용되어 노치 디자인 문제를 해결할 수 있는 SafeAreaView 컴포넌트를 제공한다.

App.js를 다음과 같이 수정한다.
```javascript
const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;
```

### StatusBar 컴포넌트
iOS에서 노치 디자인 문제를 해결하였다.
안드로이드도 Title 컴포넌트가 상태 바에 가려진 것을 볼 수 있다.
또한 배경색이 어두워 상태 바의 내용도 눈에 잘 들어오지 않는다는 문제도 있다.
이번에는 상태 바를 변경해 안드로이드에서 Title 컴포넌트가 가려지는 문제를 해결하고 어두운 배경에서도 잘 보이도록 수정할 것이다.

리액트 네이티브는 상태 바를 제어할 수 있는 StatusBar 컴포넌트를 제공한다.
StatusBar 컴포넌트는 상태바의 스타일을 변경할 수 있으며, 안드로이드 기기에서 상태 바가 컴포넌트를 가리는 문제를 해결할 수 있다.
```javascript
import { StatusBar } from 'react-native';

...

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
            </Container>
        </ThemeProvider>
    );
}
```
StatusBar 컴포넌트를 이용해 상태 바의 내용이 흰색으로 나타나도록 수정했다.
StatusBar 컴포넌트의 backgroundColor 속성은 안드로이드에만 적용되는 속성이며 상태 바의 바탕색을 변경할 수 있다.

### Input 컴포넌트 만들기
Input 컴포넌트는 할 일 항목을 추가할 때뿐만 아니라, 등록된 할 일 항목을 수정할 때도 사용할 예정이다.

components 폴더 밑에 Input.js 파일을 생성하고 작성한다.
```javascript
import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
    width: 100%;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 25px;
    color: ${({ theme }) => theme.text};
`;

const Input = () => {
    return <StyledInput />
};

export default Input;
```
작성 완료 후 App 컴포넌트를 다음과 같이 수정한다.
```javascript
import Input from './components/Input';

...

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input />
            </Container>
        </ThemeProvider>
    );
```

### Dimensions
리액트 네이티브에서는 크기가 다양한 모바일 기기에 대응하기 위해 현재 화면의 크기를 알 수 있는 Dimensions와 useWindowDimensions를 제공한다.

두 기능 모두 현재 기기의 화면 크기를 알 수 있고, 이를 이용해 다양한 크기의 기기에 동일한 모습으로 적용될 수 있도록 코드를 작성할 수 있다.

**Dimensions**는 처음 값을 받아왔을 때의 크기로 고정되기 때문에 기기를 회전해서 화면이 전환되면 변화된 화면의 크기와 일치하지 않을 수 있다.
이런 상황에서 이벤트 리스너를 등록하여 화면의 크기 변화에 대응할 수 있도록 기능을 제공하고 있다.

**useWindowDimensions**는 리액트 네이티브에서 제공하는 Hooks 중 하나로, 화면의 크기가 변경되면 화면의 크기, 너비, 높이를 자동으로 업데이트한다.

Input.js를 다음과 같이 수정한다.
```javascript
import { Dimensions } from 'react-native';

const StyledInput = styled.TextInput`
    width: ${({ width }) => width - 40}px;
	...
`;

const Input = () => {

    const width = Dimensions.get('window').width;

    return <StyledInput width={width} />;
};
```
Dimensions를 활용해 화면의 너비를 구하고, props로 전달해서 스타일을 작성할 때 화면의 너비를 이용할 수 있도록 수정했다.

useWindowDimensions을 사용하면 다음과 같다.
```javascript
import { useWindowDimensions } from 'react-native';

const StyledInput = styled.TextInput`
    width: ${({ width }) => width - 40}px;
	...
`;

const Input = () => {

    const width = useWindowDimensions.width;

    return <StyledInput width={width} />;
};
```

### Input 컴포넌트
placeholder에 적용할 문자열은 props로 받아 설정하고 placeholder의 색은 타이틀과 같은 색으로 설정한다.
그리고 글자수는 50자로 제한한다.

App.js를 다음과 같이 수정한다.
```javascript
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input placeholder='+ Add a Task' />
            </Container>
        </ThemeProvider>
    );
```
그리고 Input.js를 다음과 같이 수정한다.
```javascript
const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
}))`...`;
width: ${({ width }) => width - 40 }px;
height: 60px;
margin: 3px 0;
padding: 15px 20px;
border - radius: 10px;
background - color: ${ ({ theme }) => theme.itemBackground };
font - size: 25px;
color: ${ ({ theme }) => theme.text };
`;

const Input = ({ placeholder }) => {

    const width = Dimensions.get('window').width;

    return (
        <StyledInput width={width} placeholder={placeholder} maxLength={50} />;
    );
};
```
props로 전달된 placeholder를 설정하고, 스타일드 컴포넌트의 attrs를 이용해 theme에 정의된 색상을 placeholder의 색으로 설정했다.
또한 maxLength를 사용하여 글자수를 50자로 제한했다.

이번에는 TextInput 컴포넌트에서 제공하는 속성을 이용해 키보드의 설정을 다음과 같이 변경한다.
```javascript
const Input = ({ placeholder }) => {
    const width = Dimensions.get('window').width;

    return <StyledInput
        width={width}
        placeholder={placeholder}
        maxLength={50}
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='done'
    />;
};
```
autoCapitalize 속성을 none으로 지정하여 자동으로 대문자로 전환하지 않도록 설정하였다.
autoCorrect 속성을 이용해 자동 수정 기능도 사용하지 않도록했다.
returnKeyType으로 키보드의 완료버튼을 done으로 변경했다.

TextInput 컴포넌트에는 이외에도 다양한 속성들이 존재한다.
returnKeyType에 설정할 수 있는 값 중에는 done이나 next처럼 두 플랫폼 모두 적용되는 값도 있지만 iOS에만 적용되는 none이나 안드로이드에만 적용되는 join 같은 값도 있다.
또한 아이폰의 키보드 색상을 변경하는 keyboardAppearance가 있다.
keyboardAppearance로 아이폰 키보드 색상을 어둡게 설정해볼 것이다.

### 이벤트
입력되는 값을 이용할 수 있도록 App 컴포넌트에 이벤트를 다음과 같이 등록할 것이다.
```javascript
export default function App() {

    const [newTask, setNewTask] = useState('');

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask('');
    };

    const _handleTextChange = text => {
        setNewTask(text);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input 
                placeholder='+ Add a Task' 
                value={newTask}
                onChangeText={_handleTextChange}
                onSubmitEditing={_addTask}
                />
            </Container>
        </ThemeProvider>
    );
}
```
useState를 사용하요 newTask 상태 변수와 세터 함수를 생성하고 Input 컴포넌트에서 값이 변할 때마다 newTask에 저장하도록했다. 완료 버튼을 누르면 입력된 내용을 확인하고 Input 컴포넌트를 초기화하도록 만들었다.

이제 Input 컴포넌트에서 props로 전달된 값들을 이용하도록 Input.js를 다음과 같이 수정한다.
```javascript
import PropTypes from 'prop-types';

const Input = ({ placeholder, value, onChangeText, onSubmitEditing }) => {
    const width = Dimensions.get('window').width;

    return <StyledInput
        ...
        value={value}
        onChange={onChangeText}
        onSubmitEditing={onSubmitEditing}
    />;
};

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
}

export default Input;
```

<br/>

---

# 할 일 목록 만들기
이제 Input 컴포넌트를 통해 입력받은 내용을 목록으로 출려하는 기능을 만들 것이다.

할 일 목록을 만들기 위해서는 2개의 컴포넌트를 만들어야 한다.
- **IconButton 컴포넌트**: 완료, 수정, 삭제 버튼으로 사용할 컴포넌트
- **Task 컴포넌트**: 목록의 각 항목으로 사용할 컴포넌트

### 이미지 준비
IconButton 컴포넌트를 만들기 전에 프로젝트에서 사용할 아이콘 이미지를 다운로드 해야한다.
구글 머티리얼 디자인 아이콘을 사용할 것이다.
프로젝트의 assets 폴더 밑에 icons 폴더를 생성하고 준비된 아이콘 이미지들을 넣는다.
파일명을 동일한 이름으로 사용하면서 뒤에 @2x, @3x를 붙이면 리액트 네이티브에서 화면 사이즈에 알맞은 크기의 이미지를 자동으로 불러와 사용한다.

### IconButton 컴포넌트
준비된 아이콘 이미지로 IconButton 컴포넌트를 만들 것이다.
리액트 네이티브에서 제공하는 Image 컴포넌트는 프로젝트에 있는 이미지 파일의 경로나 URL을 이용하여 원격에 있는 이미지를 렌더링할 수 있다.

먼저 아이콘 이미지를 관리할 images.js 파일을 src 폴더 밑에 생성한다.
```javascript
import CheckBoxOutline from '../assets/icons/check_box_outline.png';
import CheckBox from '../assets/icons/check_box.png';
import DeleteForever from '../assets/icons/delete_forever.png';
import Edit from '../assets/icons/edit.png';

export const images = {
    uncompleted: CheckBoxOutline,
    completed: CheckBox,
    delete: DeleteForever,
    update: Edit,
};
```
파일 작성이 완료되면 components 폴더 안에 IconButton 컴포넌트를 만든다.
```javascript
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images';

const Icon = styled.Image`
    tint-color: ${({ theme }) => theme.text};
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const IconButton = ({ type, onPressOut }) => {
    return (
        <TouchableOpacity onPressOut={onPressOut}>
            <Icon source={type} />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
};

export default IconButton;
```
완성된 IconButton 컴포넌트를 App 컴포넌트에 다음과 같이 사용한다.
```javascript
import { images } from './images';
import IconButton from './components/IconButton';

...

    return (
        ...
                <IconButton type={images.uncompleted} />
                <IconButton type={images.completed} />
                <IconButton type={images.delete} />
                <IconButton type={images.update} />
            </Container>
        </ThemeProvider>
    );
}
```

### Task 컴포넌트
IconButton 컴포넌트를 이용해 Task 컴포넌트를 만들 것이다.
Task 컴포넌트는 완료 여부를 확인하는 버튼과 입력된 할 일 내용, 항목 삭제 버튼, 수정 버튼으로 구성된다.

다음과 같이 src 폴더 안에 Task.js 파일을 만들고 작성한다.
```javascript
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`;

const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme }) => theme.text};
`;

const Task = ({ text }) => {
    return (
        <Container>
            <IconButton type={images.uncompleted} />
            <Contents>{text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} />
        </Container>
    );
};

Task.prototype = {
    text: PropTypes.string.isRequired,
};

export default Task;
```

그리고 App 컴포넌트에서 Task 컴포넌트를 사용하여 할 일 목록을 만든다.
```javascript
import Task from './components/Task';

export default function App() {

    const width = Dimensions.get('window').width;
	
 	...
        
      return (
			...
                <List width={width}>
                    <Task text='Hanbit' />
                    <Task text='React Native' />
                    <Task text='React Native Sample' />
                    <Task text='Edit TODO Item' />
                </List>
            </Container>
        </ThemeProvider>
    );
}
  ...
```

<br/>

---

# 기능 구현하기
기능은 추가, 삭제, 완료, 수정을 구현할 것이다.

### 추가 기능
이제 App 컴포넌트에서 임의로 작성한 할 일 항목을 변경할 것이다.
```javascript
export default function App() {

    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        '1': { id: '1', text: 'Hanbit', completed: false },
        '2': { id: '2', text: 'React Native', completed: true },
        '3': { id: '3', text: 'React Native Sample', completed: false },
        '4': { id: '4', text: 'Edit TODO Item', completed: false },
    });

    ...
    
    return (
        ...
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task text={item.text} />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
```
결과를 확인하면 화면에 항목은 잘 나타나지만 ket와 관련된 경고 메시지가 나타난다.
key는 리액트에서 컴포넌트 배열을 렌더링했을 때 어떤 아이템이 추가, 수정, 삭제되었는지 식별하는 것을 돕는 고유값으로 리액트에서 특별하게 관리되며 자식 컴포넌트의 props로 전달되지 않는다.

각 항목마다 고유한 id를 갖도록 설계했으므로 id를 key로 지정한다.
```javascript
...
<List width={width}>
	{Object.values(tasks)
		.reverse()
		.map(item => (
			<Task key={item.id} text={item.text} />
		))}
</List>
...
```
이제 \_addTask 함수가 호출되면 tasks에 새로운 할 일 항목이 추가되도록 수정할 것이다.
```javascript
    const _addTask = () => {
        const ID = Date.now().toString()
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    };
```

### 삭제 기능
```javascript
...
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    }
    ...
    return (
    	...
            <List width={width}>
                {Object.values(tasks)
                    .reverse()
                    .map(item => (
                        <Task key={item.id} item={item} deleteTask={_deleteTask} />
                    ))}
            </List>
        </Container>
    </ThemeProvider>
   );
...
```
삭제 버튼 클릭 시 항목의 id를 이용해 tasks에서 해당 항목을 삭제하는 \_deleteTask 함수를 작성했다.
Task 컴포넌트에 생성된 항목 삭제 함수와 함께 항목 내용 전체를 전달해 자식 컴포넌트에서도 항목의 id를 확인할 수 있도록 수정했다.

이제 Task.js를 열어 전달받은 내용이 사용되도록 수정한다.
```javascript
... 

const Task = ({ item, deleteTask }) => {
    return (
        <Container>
            <IconButton type={images.uncompleted} />
            <Contents>{item.text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} />
        </Container>
    );
};

Task.prototype = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

```
이제 IconButton 컴포넌트에서 전달된 함수를 이용하도록 수정한다.
```javascript
...
const IconButton = ({ type, onPressOut, id }) => {
    const _onPressOut = () => {
        onPressOut(id);
    };

    return (
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon source={type} />
        </TouchableOpacity>
    );
};

IconButton.defaultProps = {
    onPressOut: () => {},
}

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
    id: PropTypes.string,
};

export default IconButton;
```

### 완료 기능
항목을 완료 상태로 만들어도 다시 미완료 상태로 돌아올 수 있도록 완료 버튼을 만들 것이다.
```javascript
const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    }
...
	<List width={width}>
        {Object.values(tasks)
            .reverse()
            .map(item => (
                <Task key={item.id} 
                item={item} 
                deleteTask={_deleteTask} 
                toggleTask={_toggleTask}
                />
            ))}
    </List>
...
```
함수가 호출될 때마다 완료 여부를 나타내는 completed 값이 전환되는 함수를 작성했다.
```javascript
const Task = ({ item, deleteTask, toggleTask }) => {
    return (
        <Container>
            <IconButton
                type={item.completed ? images.completed : images.uncompleted}
                id={item.id}
                onPressOut={toggleTask}
            />
            <Contents>{item.text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} />
        </Container>
    );
};

Task.prototype = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
};

export default Task;
```
props로 전달된 toggleTask 함수를 완료 상태를 나타내는 버튼의 onPressOut으로 설정하고, 항목 완료 여부에 따라 버튼 이미지가 다르게 나타나도록 수정했다.

완료된 항목은 아이콘 이미지만 변경되는 것이 아니라, 수정 기능을 사용하지 않도록 수정 버튼이 나타나지 않게 Task 컴포넌트를 수정할 것이다.
미완료 항목과 조금 더 명확하게 구분되도록 디자인도 수정할 것이다.
```javascript
...
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
    text-decoration-line: ${({ completed }) =>
        completed ? 'line-through' : 'none'};
`;

const Task = ({ item, deleteTask, toggleTask }) => {
    return (
        <Container>
            <IconButton
                type={item.completed ? images.completed : images.uncompleted}
                id={item.id}
                onPressOut={toggleTask}
                completed={item.completed}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {item.completed || <IconButton type={images.update} />}
            <IconButton
                type={images.delete}
                id={item.id}
                onPressOut={deleteTask}
                completed={item.completed}
            />
        </Container>
    );
};
...
```
항목의 completed 값에 따라 수정 버튼이 렌더링되지 않도록 수정했다.
Contents 컴포넌트에 completed를 전달한 후 완료 여부에 따라 취소선이 나타나고 글자 색이 변경되도록 스타일이 변경되었고, 아이콘 버튼에도 completed를 전달했다.

이제 IconButton 컴포넌트에서 completed의 값에 따라 다른 스타일이 적용되도록 수정할 것이다.
```javascript
const Icon = styled.Image`
    tint-color: ${({ theme, completed }) =>
        completed ? theme.done : theme.text};
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const IconButton = ({ type, onPressOut = () => {}, id, completed }) => {
    const _onPressOut = () => {
        onPressOut(id);
    };

    return (
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon source={type} completed={completed} />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
    id: PropTypes.string,
    completed: PropTypes.bool,
};

export default IconButton;
```

### 수정 기능
수정 버튼을 클릭하면 해당 항목이 Input 컴포넌트로 변경되면서 내용을 수정할 수 있도록 구현할 것이다.

App 컴포넌트를 다음과 같이 수정한다.
```javascript
export default function App() {
  
	...
    
    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };

    return (
        ...
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task key={item.id} 
                            item={item} 
                            deleteTask={_deleteTask} 
                            toggleTask={_toggleTask}
                            updateTask={_updateTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
```
이제 Task 컴포넌트에서 수정 버튼을 클릭하면 항목이 현재 내용을 가진 Input 컴포넌트가 렌더링 되어 수정할 수 있도록 만들 것이다.
```javascript
...

const Task = ({ item, deleteTask, toggleTask }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);

    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    };

    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, { text });
            setIsEditing(false);
            updateTask(editedTask);;
        }
    };
    return isEditing ? (
        <Input
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSubmitEditing}
        />
    ) : (
        <Container>
            <IconButton
                type={item.completed ? images.completed : images.uncompleted}
                id={item.id}
                onPressOut={toggleTask}
                completed={item.completed}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {item.completed || (
                <IconButton type={images.update}
                    onPressOut={_handleUpdateButtonPress}
                />
            )}
            <IconButton
                type={images.delete}
                id={item.id}
                onPressOut={deleteTask}
                completed={item.completed}
            />
        </Container>

    );
};
...
```
수정 상태 관리를 위해 isEditing 변수를 생성하고 수정 버튼을 클릭하면 값이 변하도록 작성했다.
수정 내용을 담을 text 변수를 Input 컴포넌트의 값으로 설정했다.

### 입력 취소하기
입력 중에 다른 영역을 클릭해서 Input 컴포넌트가 포커스를 잃으면 입력 중인 내용이 사라지고 취소되도록 Input 컴포넌트를 수정할 것이다.
```javascript
const Input = ({
    ...
    onBlur,
}) => {
    const width = Dimensions.get('window').width;

    return (
        <StyledInput
            ...
            onBlur={onBlur}
        />
    );
};

Input.propTypes = {
    ...
    onBlur: PropTypes.func.isRequired,
};

export default Input;
```
Input 컴포넌트를 이용하는 곳에 onBlur 함수를 전달 할 것이다.
```javascript
    const _onBlur = () => {
        setNewTask('');
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                />
                ...
    );
}
```
App 컴포넌트에 Input 컴포넌트가 포커스를 잃으면 추가 중이던 값을 초기화하는 onBlur 함수를 추가했다.
```javascript
const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
    ...
    const _onBlur = () => {
        if (isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    };

    return isEditing ? (
        <Input
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSubmitEditing}
            onBlur={_onBlur}
        />
    ...
export default Task;
```

<br/>

---

# 부가 기능
데이터를 저장하고 불러오는 기능과 로딩 화면을 변경하는 방법에 대해 알아볼 것이다.

### 데이터 저장하기
리액트 네이티브에서는 AsyncStorage를 이용해 로컬에 데이터를 저장하고 불러오는 기능을 구현할 수 있다.
**AsyncStorage**는 비동기로 동작하며 문자열로 된 키-값 형태의 데이터를 기기에 저장하고 불러올 수 있는 기능을 제공한다.
```bash
npm install @react-native-async-storage/async-storage
# 에러로 인해 아래를 사용했다.
npm install @react-native-async-storage/async-storage --legacy-peer-deps
```

App.js 파일을 열어 다음과 같이 작성한다.
```javascript
export default function App() {

    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    };

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };
...
```

### 데이터 불러오기
데이터를 불러오는 함수를 작성할 것이다.
App.js 파일을 다음과 같이 작성한다.
```javascript
export default function App() {
	...
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };
	...
```
항목을 저장할 때 사용했던 키와 동일한 키로 데이터를 불러오고 객체로 변환하여 tasks에 입력하는 \_loadTasks 함수를 작성했다.
\_loadTasks 함수는 애플리케이션이 로딩되는 단계에서 실행되며, 첫 화면이 나타나기 전에 완료되어 불러온 항목이 화면에 렌더링되는 것이 좋다.

Expo에서 제공하는 AppLoading 컴포넌트를 이용하면 이런 작업을 쉽게 구현할 수 있다.
**AppLoading** 컴포넌트는 특정 조건에서 로딩 화면이 유지되도록 하는 기능으로, 렌더링하기 전에 처리해야 하는 작업을 수행하는 데 유용하게 사용된다.

expo SDK 48부터 **pLoading**포넌트는 더 이상 사용되지 않으며, 대신 **expo-splash-screen**을 사용해야 한다.
```bash
expo install expo-splash-screen
# 아래를 사용했다.
npx expo install expo-splash-screen -- --legacy-peer-deps
```
> ### AppLoading 컴포넌트와 expo-splash-screen 차이
AppLoading에서 expo-splash-screen으로 변경되면서 달라진 점은 주로 스플래시 화면을 제어하는 방식과 앱 초기화 시 비동기 작업을 처리하는 방식에 있다. 
expo-splash-screen은 앱이 로딩되는 동안 스플래시 화면을 유지하며, 앱이 준비되었을 때 이를 숨긴다. 
AppLoading은 앱이 준비될 때까지 화면을 보여주는 역할을 했고, expo-splash-screen은 앱 준비 상태와 스플래시 화면 제어를 분리하여 더 세밀한 제어가 가능하다.
>
### 스플래시 화면 제어
- AppLoading: 자동으로 화면을 보여주고, 비동기 작업이 완료되면 onFinish에서 스플래시 화면을 숨겼습니다.
- expo-splash-screen: 스플래시 화면을 수동으로 제어할 수 있습니다. 앱이 초기화되는 동안 스플래시 화면을 계속 표시하고, 비동기 작업이 완료되면 SplashScreen.hideAsync()를 호출하여 스플래시 화면을 숨깁니다.
### 비동기 작업 처리
- AppLoading: startAsync를 사용하여 비동기 작업을 시작하고, 작업이 끝나면 onFinish가 호출됩니다.
- expo-splash-screen: useEffect 훅과 함께 async 작업을 처리하며, 비동기 작업이 끝나면 setIsReady(true)로 앱 준비 상태를 업데이트하고, SplashScreen.hideAsync()로 스플래시 화면을 숨깁니다.
### 더 세밀한 제어
- AppLoading: 스플래시 화면을 자동으로 숨기므로, 앱이 준비되기 전까지 기다리는 동안 스플래시 화면이 표시되었습니다.
- expo-splash-screen: 스플래시 화면을 명시적으로 제어할 수 있어서, 앱이 준비되었을 때 정확하게 숨길 수 있습니다.



App.js를 다음과 같이 작성한다.
```javascript
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

    const width = Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    // SplashScreen.preventAutoHideAsync()는 앱이 준비될 때까지 
    // 스플래시 화면을 숨기지 않도록 한다.
    useEffect(() => {
        async function prepare() {
            try {
                await _loadTasks();
            } catch (e) {
                console.error(e);
            } finally {
                setIsReady(true);
                 // 로딩 완료 후 스플래시 화면을 숨긴다.
                SplashScreen.hideAsync();
            }
        }
        prepare();
    }, []);
    ...
    return isReady ? (
        <ThemeProvider theme={theme}>
            ...
        </ThemeProvider>
    ) : null; // 스플래시 화면이 끝나면 null로 반환되어 앱 화면이 나타난다.
}
```

### 로딩 화면 아이콘
프로젝트 생성과 함께 assets 폴더에 생성되는 splash.png 파일, icon.png 파일은 각각 로딩 화면과 애플리케이션의 아이콘으로 사용되는 이미지이다.

로딩 화면으로 사용될 이미지의 크기는 다양한 기기에 대응하기 위해 1242 \* 2436으로 준비하는 것이 좋다.
원하는 아이콘 이미지를 다운받은 후 파일명은 splash.png로 하면 된다.
만약 다른 파일명으로 유지하고 싶다면 app.json 파일에서 splash의 이미지로 경로를 수정하면 된다.

로딩 이미지가 변경되었지만 기기의 크기에 따라 공백이 생기는 경우가 있다.
이때는 resizeMode 혹은 backgroundColor의 값을 변경해서 공백 부분을 제거할 수 있다.
**resizeMode**의 값을 cover로 변경하면 로딩 화면으로 사용하는 이미지가 화면 전체를 덮을 수 있도록 렌더링 된다.
**backgroundColor**의 값을 변경하면 흰색으로 나타나는 공백 부분이 지정한 색으로 렌더링 된다.

아이콘으로 사용할 이미지는 iOS의 경우 1024 \* 1024 크기가 필요하고 안드로이드의 경우 최소 512 \* 512 크기의 이미지가 필요하다.
Expo 프로젝트는 Expo 애플리케이션 혹은 메뉴 화면에서 아이콘을 확인할 수 있다.

