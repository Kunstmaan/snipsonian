import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { MixedSchema } from 'yup';
import { FormikProps, withFormik, FormikTouched, validateYupSchema, FormikBag } from 'formik';

export interface IValidationError<ErrorTypes> {
    type: ErrorTypes;
    message: string;
}

type ValidationErrors<Values, ErrorTypes> = { [key in keyof Values]: IValidationError<ErrorTypes>[] };

type TSetFieldValue<Values> =
    (field: keyof Values, value: string | number | object | boolean) => void;

export interface IFormRenderProps<Values, ErrorTypes, Errors = ValidationErrors<Values, ErrorTypes>> {
    values: Values;
    errors: Errors;
    handleChange: (e: React.ChangeEvent<{}>) => void;
    dirty: boolean;
    isValid: boolean;
    touched: FormikTouched<Values>;
    setFieldValue: TSetFieldValue<Values>;
    submitForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setErrors: (errors: any) => void;
    resetForm: (nextValues: Values) => void;
}

interface IPublicProps<Values, ErrorTypes> {
    /**
     * Friendly name for the form
     */
    name: string;
    /**
     * Schema to use to validate the form values
     */
    schema: MixedSchema;
    /**
     * Handle a form submit
     */
    handleSubmit: (values: Values, formikBag: FormikBag<this, Values>) => void;
    /**
     * Initial values to be shown on the form
     */
    initialValues: Values;
    /**
     * The form content
     */
    render: (formRenderProps: IFormRenderProps<Values, ErrorTypes>) => React.ReactElement<{}>;
    /**
     * The base translation key, will be passed to components using the FormContext
     */
    translationPrefix: string;
    /**
     * Renders the footer which should contain the submit button
     */
    footer: React.ReactNode;
    className?: string;
    ref?: React.RefObject<HTMLFormElement>;
}

const CLASS_NAME = 'Form';

export const FormContext = React.createContext({
    formName: '',
    formRenderProps: {}, // The Consumer of the context should cast this as the correct IFormRenderProps
    translationPrefix: '',
});

class Form<Values, ErrorTypes> extends PureComponent<IPublicProps<Values, ErrorTypes> & FormikProps<Values>> {
    private isInitialValid: boolean = true;

    public render() {
        const { props } = this;

        const formClass = classNames(
            CLASS_NAME,
            props.className,
        );

        const isValid = this.isFormValid();

        const formRenderProps: IFormRenderProps<Values, ErrorTypes> = {
            values: props.values,
            errors: props.errors as unknown as ValidationErrors<Values, ErrorTypes>, /* Formik expects
                                                                props.errors to be FormikErrors, but we
                                                                map these in the validateYupSchema */
            handleChange: props.handleChange,
            dirty: props.dirty,
            isValid,
            touched: props.touched,
            // eslint-disable-next-line max-len
            setFieldValue: props.setFieldValue as (field: keyof Values, value: string | number | object | boolean) => void,
            submitForm: props.submitForm,
            resetForm: props.resetForm,
            setErrors: props.setErrors,
        };

        return (
            <form
                id={props.name}
                name={props.name}
                onSubmit={props.handleSubmit}
                className={formClass}
                ref={props.ref}
                noValidate
            >
                <FormContext.Provider
                    value={{
                        formName: props.name,
                        formRenderProps,
                        translationPrefix: props.translationPrefix,
                    }}
                >
                    <div className={`${CLASS_NAME}__content`}>
                        {props.render(formRenderProps)}
                    </div>

                    {props.footer && (
                        <footer className={`${CLASS_NAME}__footer`}>
                            {props.footer}
                        </footer>
                    )}
                </FormContext.Provider>
            </form>
        );
    }

    public async componentDidMount() {
        const { validateForm, values, setErrors } = this.props;
        const errors = await validateForm(values);
        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        this.isInitialValid = isValid;
    }

    private isFormValid() {
        const { props } = this;
        if (!props.dirty) {
            return this.isInitialValid;
        }
        // The default isValid check from Formik uses the dirty flag in combination with the isInitialValid property
        // To avoid having to specifiy the isInitialValid the form is validated when it is mounted,
        // but this does not reset the dirty flag
        return Object.keys(props.errors).length === 0;
    }
}

interface IYupErrors {
    inner: {
        path: string;
        message: string;
        type: string;
    }[];
}

export default function GenericForm<Values, ErrorTypes extends string>() {
    return withFormik<IPublicProps<Values, ErrorTypes>, Values>({
        enableReinitialize: false,
        mapPropsToValues: (props) => props.initialValues,
        validate: (values, props) =>
            validateYupSchema(values, props.schema, false, { abortEarly: false })
                .then(() => ({}))
                .catch((validationError: IYupErrors) => {
                    const allErrors: { [key: string]: IValidationError<ErrorTypes>[] } = {};

                    Object.keys(values).forEach((key) => {
                        const errorsForKey = validationError.inner.filter((detail) => detail.path === key);

                        errorsForKey.forEach((error) => {
                            if (!allErrors[key]) {
                                allErrors[key] = [];
                            }
                            allErrors[key].push({
                                type: error.type as ErrorTypes,
                                message: error.message,
                            });
                        });
                    });
                    throw allErrors;
                }),
        handleSubmit: (values, formikBag) => {
            const { props } = formikBag;
            if (typeof props.handleSubmit === 'function') {
                props.handleSubmit(values, formikBag);
            }
        },
    })(Form as new () => Form<Values, ErrorTypes>);
}
