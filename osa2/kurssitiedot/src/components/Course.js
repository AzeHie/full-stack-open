import { Fragment } from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <Fragment>
      {courses.map((course) => (
        <Fragment key={course.name}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Course;
