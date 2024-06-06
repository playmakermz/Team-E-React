import { useState } from 'react';

const FormSubmit = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [missionCompleted, setMissionCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      setError('Input tidak boleh kosong');
      setMissionCompleted(false);
    } else {
      setError('');
      setMissionCompleted(true);
    }
  };

  return (
    <div>
      <h2>Form Submit</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter something'
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <p className='error'>{error}</p>}
      {missionCompleted && (
        <>
          <p className='input-result'>{input}</p>
          <p>Kamu menyelesaikan misi 🎉</p>
        </>
      )}
    </div>
  );
};

export default FormSubmit;
