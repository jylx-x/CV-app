import React, { Component } from "react";

import PreviewGeneral from "./Preview/PreviewGeneral";
import PreviewSkills from "./Preview/PreviewSkills";
import PreviewEdu from "./Preview/PreviewEdu";
import PreviewExp from "./Preview/PreviewExp";
import PreviewAwards from "./Preview/PreviewAwards";

class Preview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props;
    return (
      <div id="preview">
        <button
          type="button"
          onClick={() => {
            document.getElementById("preview").style.display = "none";
          }}
        >
          x
        </button>
        <PreviewGeneral general={state.general} />
        <PreviewSkills skills={state.skills} />
        <PreviewAwards awards={state.awards} />
        <PreviewEdu education={state.education} />
        <PreviewExp experiences={state.experiences} />
      </div>
    );
  }
}

export default Preview;
