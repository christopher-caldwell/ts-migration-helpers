import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const buildSteps = (steps, activeStep) => steps.map((currentStep, currentIndex) => {
    const lineBefore = currentIndex !== 0;
    const lineAfter = currentIndex !== steps.length - 1;
    const active = currentIndex === activeStep;
    const done = currentIndex < activeStep;
    return (
        <div className="step-bar-step" key={`step-bar-step-${currentStep.title}`}>
            <div
                className={classNames('step-bar-circle', {
                    'step-bar-active': active,
                    'step-bar-done': done,
                })}
            />
            <div className="step-bar-text-container">
                <p className="step-bar-title">{currentStep.title}</p>
            </div>
            {lineBefore ? <div className="step-bar-line-before" /> : []}
            {lineAfter ? <div className="step-bar-line-after" /> : []}
        </div>
    );
});

const StepBar = ({ steps, className, activeStep }) => (
    <div className={`step-bar-container ${className}`}>{buildSteps(steps, activeStep)}</div>
);

StepBar.propTypes = {
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
    className: PropTypes.string,
};

StepBar.defaultProps = {
    className: '',
};

export default StepBar;
