function Learning(props) {
    return (
        <div>
            <p>Adding to the render with {5 + 5} in JSX</p>
            <ul>
                 <li>{props.first}</li>
             </ul>
        </div>
    );
}

export default Learning;