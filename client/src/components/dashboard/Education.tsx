import React from 'react';
import { deleteEducation } from '../../store/actions/profile';
import { useDispatch } from 'react-redux';
import formatDate from '../../utils/formatDate';

function Education({ education }: any) {
  const dispatch = useDispatch();
  const educations = education.map((edu: any) => (
    <tr key={edu._id}>
      <td> {edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        {' '}
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(deleteEducation(edu._id));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
}

export default Education;
