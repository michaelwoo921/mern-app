import React from 'react';
import formatDate from '../../utils/formatDate';

function ProfileExperience({ experience }: any) {
  const { company, title, location, description, from, to } = experience;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
}

export default ProfileExperience;
