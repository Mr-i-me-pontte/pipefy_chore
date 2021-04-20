import React, {useState} from 'react';
import {render} from 'react-dom';
import {Button} from 'pipestyle';
import 'pipestyle/assets/button.css';

const App = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleLoad1 = () => setLoading1(prev => !prev);
    const handleLoad2 = () => setLoading2(prev => !prev);

    return (
        <>
            <Button loading={loading1} onClick={handleLoad1}>
                Submit
            </Button>
            <Button loading={loading2} onClick={handleLoad2}>
                Large submit button
            </Button>
        </>
    )
};

render(<App/>, document.getElementById('root'));

