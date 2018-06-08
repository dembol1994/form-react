import React, {Component} from 'react';
import validator from 'validator';

import Button from '../../components/Button/Button';
import classes from './Form.css';
import Input from '../../components/Input/Input';

class Form extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    isString: true,
                    required: true
                },
                valid: false,
                touched: false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    isString: true,
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    isZipcode: true,
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    isString: true,
                    required: true
                },
                valid: false,
                touched: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    isEmail: true,
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: ' ', displayValue: 'Delivery Method' },
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ' ',
                valid: <false></false>
            }
        },
        formIsValid: false,
        loading: false
    };

    onSubmitHandler = (event) => {
      event.preventDefault();
      this.setState({
          ...this.state,
          loading: true
      })
    };

    checkValidity = (value, rules)=> {
        let isValid = true;

        if (rules && rules.isString) {
            isValid = !validator.isDecimal(value) && isValid;
        }

        if (rules && rules.zipCode) {
            isValid = validator.isDecimal(validator.blacklist(value, '-')) && isValid;
        }

        if (rules && rules.isEmail) {
            console.log('is email');
            isValid = validator.isEmail(value) && isValid
        }

        if(rules && rules.required) {
            console.log('empty');
           isValid = !validator.isEmpty(value.trim()) && isValid;
        }

        if(rules && rules.isNumber) {
            isValid = validator.isDecimal(value) && isValid;
        }

        if(rules && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChange = (event, inputIdenty) => {
        const updData = {...this.state.orderForm};
        const updForm = {...updData[inputIdenty]};
        updForm.value = event.target.value;
        updForm.touched = true;
        updForm.valid = this.checkValidity(updForm.value, updForm.validation);
        updData[inputIdenty] = updForm;
        let formIsValid = true;
        for(let id in updData) {
            formIsValid = updData[id].valid && formIsValid;
        }
        this.setState({orderForm: updData, formIsValid: formIsValid});
    };

    render() {
        const formElAr = [];
        for (let key in this.state.orderForm) {
            formElAr.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }

        let sth = (
            <div><h4>Enter your Contact Data</h4>
                <form onSubmit={this.onSubmitHandler}>
                    {formElAr.map(el => {
                        return <Input
                            touched={el.config.touched}
                            shouldValidate={el.config.validation}
                            invalid={!el.config.valid}
                            key={el.id}
                            elementType={el.config.elementType}
                            value={el.config.value}
                            elementConfig={el.config.elementConfig}
                            changed={(event) => this.inputChange(event, el.id)}/>
                    })}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
                </form></div>);

        return(
            <div className={classes.Form}>
                {sth}
            </div>
        )
    }
}

export default Form;