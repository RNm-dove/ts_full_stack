
import React, { useState } from 'react';

import './set-form.module.css';
import { useAddSetMutation, SetListDocument} from '@server/data-access';

/* eslint-disable-next-line */
export interface SetFormProps {}

export const SetForm = (props: SetFormProps) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [numParts, setNumParts] = useState(1000);
  
  
  const [addSetMutation, mutationResult] = useAddSetMutation({
    update(cache, {data: addSet }) {
      cache.modify({
        fields: {
          allSets(existingSet = []) {
            const newSetRef = cache.writeQuery({
              //query: GET_NAMES,
              query: SetListDocument, // assuming that your Query is called GetNames, and that in theory you would call it somewhere else like this: useGetNamesQuery()
              data: addSet,
            })
            // return existingNames.concat(newNameRef) // if 'names' is a string, but I would think it's an array, then
            return [...existingSet, newSetRef]
          } 
        } 
      })
    }
  });

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    addSetMutation({
      variables: { name, year, numParts },
    });
    setName("");
    setYear("");
    setNumParts(1000);
  };

  console.log(mutationResult);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{' '}
        <input
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Year:{' '}
        <input
          name="year"
          value={year}
          onChange={event => setYear(event.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Number of Parts:{' '}
        <input
          name="numParts"
          value={numParts}
          onChange={event => setNumParts(+event.target.value)}
        ></input>
      </label>
      <br />
      <button>Create new set</button>
    </form>
  );
};

export default SetForm;