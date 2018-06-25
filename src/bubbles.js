import React from "react";
import * as d3 from "d3";
import tooltip from "./tooltip";

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.simulation = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(center.x)
      )
      .force(
        "y",
        d3
          .forceY()
          .strength(forceStrength)
          .y(center.y)
      )
      .force("charge", d3.forceManyBody().strength(this.charge.bind(this)))
      .on("tick", this.ticked.bind(this))
      .stop();
  }

  state = { g: null };

  shouldComponentUpdate() {
    return false;
  }

  onRef = ref => {
    this.setState({ g: d3.select(ref) }, () =>
      this.renderBubbles(this.props.data)
    );
  };

  ticked = () => {
    this.state.g
      .selectAll(".bubble")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    this.state.g
      .selectAll(".label")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);
  };

  charge = d => {
    return (
      -this.props.forceStrength *
      d.radius ** (Math.random() * (2.09 - 2.01) + 2.01)
    );

    // return -this.props.forceStrength * d.radius ** 2.06;
  };

  renderBubbles = data => {
    const bubbles = this.state.g.selectAll(".bubble").data(data, d => d.id);

    // Exit
    bubbles.exit().remove();

    // Enter
    const bubblesE = bubbles
      .enter()
      .append("circle")
      .classed("bubble", true)
      .attr("r", 0)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.color)
      // .attr('fill', d => fillColor(d.group))
      // .attr('stroke', d => d3.rgb(fillColor(d.group)).darker())
      // .attr("stroke-width", 2)
      .on("mouseover", showDetail)
      .on("mouseout", hideDetail);
    const labels = bubbles
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .classed("label", true)
      .html(function(d) {
        return `<tspan x=0 y=-20 dy="1em">${d.radius}</tspan>
                <tspan x=0 y=-4 dy="1.2em">${d.name}</tspan>`;
      });
    labels.transition().duration(0);
    bubblesE
      .transition()
      .duration(0)
      .attr("r", d => d.radius)
      .on("end", () => {
        this.simulation
          .nodes(data)
          .alpha(1)
          .restart();
      });
  };

  render() {
    return <g ref={this.onRef} className="bubbles" />;
  }
}

/*
* Function called on mouseover to display the
* details of a bubble in the tooltip.
*/
export function showDetail(d) {
  // change outline to indicate hover state.
  // d3.select(this).attr('stroke', 'black');
  d3.select(this).attr("fill", d3.rgb(d.color).darker(0.5));

  const content = `<span class="value">tooltip is here</span><br/>`;

  tooltip.showTooltip(content, d3.event);
}

/*
* Hides tooltip
*/
export function hideDetail(d) {
  // debugger;
  // reset outline
  // d3.select(this).attr('stroke', d3.rgb(d.color).darker());
  d3.select(this).attr("fill", d3.rgb(d.color));

  tooltip.hideTooltip();
}
