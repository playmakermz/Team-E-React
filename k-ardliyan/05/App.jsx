import Counter from './components/Counter';
import FormSubmit from './components/FormSubmit';
import ShoppingList from './components/ShoppingList';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='card'>
        <Counter />
      </div>
      <div className='card'>
        <FormSubmit />
      </div>
      <div className='card'>
        <ShoppingList />
      </div>
    </div>
  );
};

export default App;
