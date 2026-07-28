const trainers = [
  { id: 1, name: 'Anita Sharma', expertise: 'Java & Spring Boot' },
  { id: 2, name: 'Rohit Verma', expertise: 'React & Angular' },
  { id: 3, name: 'Divya Nair', expertise: 'Cloud & DevOps' },
];

function TrainerList() {
  return (
    <div>
      <h2>Trainers</h2>
      <ul>
        {trainers.map((trainer) => (
          <li key={trainer.id}>{trainer.name} — {trainer.expertise}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrainerList;
