import { Column, Row, Stack, TextInput } from "@carbon/react";
import useWindowSize from "../../hooks/useWindowSize";
import { memo, useMemo } from "react";

const CheckoutForm = ({ formik }) => {
  const windowSize = useWindowSize();

  // const memoizedForm = useMemo(() => {
  return (
    <form onSubmit={formik?.handleSubmit}>
      <Stack gap={7}>
        <Row>
          <Column
            className={`${windowSize?.width < 672 ? "mb-1" : null}`}
            sm={windowSize?.width < 672 ? 4 : null}
          >
            <TextInput
              type="text"
              labelText="First Name"
              id="firstName"
              placeholder="First"
              onChange={(e) => {
                console.log("First Name: onChange");
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                console.log("First Name: onBlur");
                formik?.handleBlur(e);
              }}
              value={formik?.values.firstName}
              invalid={formik?.touched.firstName && !!formik?.errors.firstName}
              invalidText={formik?.errors.firstName}
            />
          </Column>
          <Column
            className={`${windowSize?.width < 672 ? "mb-1" : null}`}
            sm={windowSize?.width < 672 ? 4 : null}
          >
            <TextInput
              type="text"
              labelText="Last Name"
              id="lastName"
              placeholder="Last"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.lastName}
              invalid={formik?.touched.lastName && !!formik?.errors.lastName}
              invalidText={formik?.errors.lastName}
            />
          </Column>
          <Column sm={windowSize?.width < 672 ? 4 : null}>
            <TextInput
              type="text"
              labelText="Phone"
              id="telephone"
              placeholder="Phone"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.telephone}
              invalid={formik?.touched.telephone && !!formik?.errors.telephone}
              invalidText={formik?.errors.telephone}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <TextInput
              type="text"
              labelText="Street"
              id="street"
              placeholder="Street Address"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.street}
              invalid={formik?.touched.street && !!formik?.errors.street}
              invalidText={formik?.errors.street}
            />
          </Column>
        </Row>

        <Row>
          <Column
            className={`${windowSize?.width < 672 ? "mb-1" : null}`}
            sm={windowSize?.width < 672 ? 4 : null}
          >
            <TextInput
              type="text"
              labelText="City"
              id="city"
              placeholder="City"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.city}
              invalid={formik?.touched.city && !!formik?.errors.city}
              invalidText={formik?.errors.city}
            />
          </Column>
          <Column
            className={`${windowSize?.width < 672 ? "mb-1" : null}`}
            sm={windowSize?.width < 672 ? 4 : null}
          >
            <TextInput
              type="text"
              labelText="State"
              id="state"
              placeholder="State"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.state}
              invalid={formik?.touched.state && !!formik?.errors.state}
              invalidText={formik?.errors.state}
            />
          </Column>
          <Column sm={windowSize?.width < 672 ? 4 : null}>
            <TextInput
              type="text"
              labelText="Post Code"
              id="postCode"
              placeholder="Post Code"
              onChange={(e) => {
                formik?.handleChange(e);
              }}
              onBlur={(e) => {
                formik?.handleBlur(e);
              }}
              value={formik?.values.postCode}
              invalid={formik?.touched.postCode && !!formik?.errors.postCode}
              invalidText={formik?.errors.postCode}
            />
          </Column>
        </Row>
      </Stack>
    </form>
  );
  // }, [formik]);

  // return memoizedForm;
};

export default memo(CheckoutForm);
