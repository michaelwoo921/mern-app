import React from 'react';
import { deleteExperience } from '../../store/actions/profile';
import { useDispatch } from 'react-redux';
import formatDate from '../../utils/formatDate';

function Experience({ experience }: any) {
  const dispatch = useDispatch();
  const experiences = experience.map((exp: any) => (
    <tr key={exp._id}>
      <td> {exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}{' '}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(deleteExperience(exp._id));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
}

export default Experience;
