// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'steps' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'steps' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'steps' implicitly has an 'any' type.
import classNames from 'classnames';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStep' implicitly has an 'any' ty... Remove this comment to see the full error message
const buildSteps = (steps, activeStep) => steps.map((currentStep, currentIndex) => {
    const lineBefore = currentIndex !== 0;
    const lineAfter = currentIndex !== steps.length - 1;
    const active = currentIndex === activeStep;
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'steps' implicitly has an 'any' ty... Remove this comment to see the full error message
    const done = currentIndex < activeStep;
    return (
        <div className="step-bar-step" key={`step-bar-step-${currentStep.title}`}>
            <div
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'steps' implicitly has an 'any' ty... Remove this comment to see the full error message
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
