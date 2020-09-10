import React, {useState, memo, useCallback} from "react";

const ALL_NAMES = ["foo", "bar", "baz"];


// For class components we have shouldComponentUpdate and PureComponent.
// For functional components we use React.memo hook. React will shallowly 
// compare props and skip rendering if they are the same.
const NameListItem = memo((props) => (
    <li>
      <button onClick={() => props.onNameClick(props.name)}>{props.name}</button>
    </li>
  ));
  
const NameList = () => {
    const [lastClickedName, setLastClickedName] = useState('' || undefined);
    
    // useCallback will return the memoized version of the 
    // callback that only changes if one of the dependecies has changed.
    // This is useful when passing callbacks to optimized child components
    // that rely on reference equality to prevent unnecessary renders.
    const onNameClick = useCallback((name) => {
      setLastClickedName(name);
    }, []);

    const names = ALL_NAMES.map((name, i) => (
      <NameListItem key={i} name={name} onNameClick={onNameClick} />
    ))
   
    return (
      <div>
        <h1>
          { lastClickedName === undefined ? "No Name Clicked Yet" : lastClickedName }
        </h1>
        <ul>
          {names}
        </ul>
      </div>
    );
  };

  export default NameList;