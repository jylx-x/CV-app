import React, { Component } from "react";
import uniqid from "uniqid";

import "./App.css";

import Header from "./components/Header";
import General from "./components/General";
import Preview from "./components/Preview";
import Education from "./components/Education";
import Experience from "./components/Experience";
import More from "./components/More";

class App extends Component {
  constructor() {
    super();

    this.state = {
      general: {
        name: { firstName: "", lastName: "" },
        address: "",
        phone: "",
        email: "",
        linkedin: "",
        intro: "",
      },

      education: [],
      university: {
        id: uniqid(),
        university: "",
        eduLocation: "",
        degree: "",
        graduation: "",
      },
      experiences: [],
      experience: {
        id: uniqid(),
        company: "",
        location: "",
        role: "",
        description: "",
        time: {
          from: "",
          to: "",
        },
      },
      awards: "",
      skills: "",
    };
  }

  generalChanges = (e) => {
    const state = { ...this.state };
    const { general } = state;
    const { name } = general;

    if (e.target.id === "firstName") {
      name.firstName = e.target.value;
    } else if (e.target.id === "lastName") {
      name.lastName = e.target.value;
    } else {
      general[e.target.id] = e.target.value;
    }

    this.setState(state);
  };

  eduChanges = (e) => {
    const state = { ...this.state };
    const { university } = state;

    university[e.target.id] = e.target.value;

    this.setState(state);
  };

  editEdu = (key) => {
    const state = { ...this.state };
    const { university } = state;

    state.education.forEach((school) => {
      if (school.id === key) {
        university.id = school.id;
        university.university = school.university;
        university.eduLocation = school.eduLocation;
        university.degree = school.degree;
        university.graduation = school.graduation;

        state.education = state.education.filter((edu) => edu.id !== key);
      }

      this.setState(state);
    });
  };

  expChanges = (e) => {
    const state = { ...this.state };
    const { experience } = state;
    const { time } = experience;

    if (e.target.id === "to") {
      time.to = e.target.value;
    } else if (e.target.id === "from") {
      time.from = e.target.value;
    } else {
      experience[e.target.id] = e.target.value;
    }

    this.setState(state);
  };

  editExp = (key) => {
    const state = { ...this.state };
    const { experience } = state;

    state.experiences.forEach((exp) => {
      if (exp.id === key) {
        experience.id = exp.id;
        experience.company = exp.company;
        experience.location = exp.location;
        experience.role = exp.role;
        experience.description = exp.description;
        experience.time.from = exp.time.from;
        experience.time.to = exp.time.to;

        state.experiences = state.experiences.filter((work) => work.id !== key);
      }

      this.setState(state);
    });
  };

  moreChanges = (e) => {
    const state = { ...this.state };

    if (e.target.id === "awards") {
      state.awards = e.target.value;
    } else if (e.target.id === "skills") {
      state.skills = e.target.value;
    }

    this.setState(state);
  };

  add = (param) => {
    const { education, university, experiences, experience } = this.state;

    if (param === "edu") {
      this.setState({
        education: education.concat(university),
        university: {
          id: uniqid(),
          university: "",
          eduLocation: "",
          degree: "",
          graduation: "",
        },
      });
    } else if (param === "exp") {
      this.setState({
        experiences: experiences.concat(experience),
        experience: {
          id: uniqid(),
          company: "",
          location: "",
          role: "",
          description: "",
          time: {
            from: "",
            to: "",
          },
        },
      });
    }
  };

  remove = (param, key) => {
    const state = { ...this.state };
    const params = state[param];

    state[param] = params.filter((elem) => elem.id !== key);

    this.setState(state);
  };

  render() {
    const {
      general,
      education,
      university,
      experiences,
      experience,
      awards,
      skills,
    } = this.state;

    return (
      <div className="main">
        <Header />
        <General change={this.generalChanges} general={general} />
        <Education
          change={this.eduChanges}
          edit={this.editEdu}
          remove={this.remove}
          education={education}
          university={university}
        />
        <button
          type="button"
          onClick={() => {
            this.add("edu");
          }}
        >
          +
        </button>
        <Experience
          change={this.expChanges}
          edit={this.editExp}
          remove={this.remove}
          experiences={experiences}
          experience={experience}
        />
        <button
          type="button"
          onClick={() => {
            this.add("exp");
          }}
        >
          +
        </button>
        <More change={this.moreChanges} awards={awards} skills={skills} />
        <button
          type="button"
          onClick={() => {
            <Preview />;
          }}
        >
          Preview
        </button>
        <Preview state={this.state} />
      </div>
    );
  }
}

export default App;