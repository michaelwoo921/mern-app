import React from 'react';
import formatDate from '../../utils/formatDate';

function ProfileEducation({ education }: any) {
  const { school, degree, fieldofstudy, description, from, to } = education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
}

export default ProfileEducation;
