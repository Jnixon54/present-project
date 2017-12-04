import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Bar } from 'react-chartjs-2';
import './DataScreen.css'


class DataScreen extends Component {
  render () {
    const numberOfSlides = this.props.slideArray.length;
    const slideLabels = []
    const questionsPerSlide = [];
    for (let i = 1; i <= numberOfSlides; i++){
      let count = 0;
      slideLabels.push(i);
      this.props.questions.forEach((question) => count += question.slideNumber === i ? 1 : 0)
      questionsPerSlide.push(count);
      console.log(`Number of questions for slide #${i}: ${count}`)
    }
    console.log(questionsPerSlide);
    const data = {
      // labels: slideLabels, // SlideNumbers
      labels: [1,2,3,4,5,6,7,8,9,10],
      datasets: [
        {
          label: 'Question Summary',
          // xAxisID: 'Slide Number',
          // yAxisID: '# of Questions',
          backgroundColor: 'rgba(255, 0, 140, 0.2)',
          borderColor: 'rgba(255, 0, 140, 1)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255, 0, 140, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 140, 1)',
          data: [1,2,5,2,5,2,1,3,7,100]
          // data: questionsPerSlide // Number of questions per slide
        }
      ]
    };
    return (
      <div>
        <div className="bar-chart">
          <Bar 
            data = { data }
            width = { 100 }
            heigth = { 100 }
            options = {{
              maintainAspectRatio: false,
              scales: {
                xAxes: [{
                  ticks: {
                    fontSize: 24,
                    fontColor: 'rgba(255, 255, 255, 0.8)'
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Slide Number',
                    fontSize: 24,
                    fontColor: 'rgba(255, 255, 255, 0.8)'
                  }
                  
                }],
                yAxes: [{
                  ticks: {
                    fontSize: 24,
                    fontColor: 'rgba(255, 255, 255, 0.8)'
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '# of Questions',
                    fontSize: 24,
                    fontColor: 'rgba(255, 255, 255, 0.8)'
                  }
                }]
              }
            }}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.student.questions,
    slideArray: state.presentation.slideArray
  }
}

export default connect(mapStateToProps)(DataScreen);