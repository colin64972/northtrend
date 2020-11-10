import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { processSheet } from '@cjo3/shared/logic/dlc'
import CachedIcon from '@material-ui/icons/Cached'
import { useDispatch, useSelector } from 'react-redux'
import { transformOptions } from '../../constants'
import { initialState } from '../../store/editor/reducers'
import { sheetDataSelector } from '../../store/selectors'
import { FormikField } from './FormikField'
import { TransformSettingsSchema } from './schema'
import { TransformSettings as ITransformSettings } from '../../store/editor/interfaces'
import {
  setProcessing,
  setTransformSettings,
  saveTransformResult
} from '../../store/editor/actions'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  noTopPadding: {
    paddingTop: 0
  },
  paper: {
    ...theme.custom.borderRadius,
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[100]
  },
  Editor_TransformSettings_paperGrid: {
    maxWidth: 1024,
    ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm')),
    marginTop: theme.custom.setSpace(),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setGrid(3, 3, theme.custom.setSpace('sm'))
    }
  },
  Editor_TransformSettings_paperGrid_position0: {
    gridColumn: '1 / 2',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4'
    }
  },
  Editor_TransformSettings_paperGrid_position1: {
    gridColumn: '2 / 3',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 2
    }
  },
  Editor_TransformSettings_paperGrid_position2: {
    gridColumn: '3 / 4',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 3
    }
  },
  Editor_TransformSettings_paperGrid_position3: {
    gridColumn: '2 / 3',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 4
    }
  },
  topMargin: {
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`
  },
  fontSize: {
    fontSize: theme.typography.fontSize
  },
  actionButtons: {
    gridColumn: '2 / 3',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: ' 1 / 4',
      gridRow: 4
    }
  },
  formButton: {
    'width': '100%',
    'marginRight': theme.custom.setSpace(),
    '&:last-of-type': {
      marginRight: 0
    }
  },
  submitButton: {
    color: 'white'
  },
  resetButton: {
    color: theme.palette.grey[600]
  }
}))

export const TransformSettings: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const sheetData = useSelector(sheetDataSelector)

  // if (process.env.NODE_ENV === 'development' && sheetData) {
  //   const XXX = processSheet(sheetData, {
  //     rangeStart: 'c17',
  //     rangeEnd: 'am47',
  //     ulTrigger: '<',
  //     ulTransform: 'zero',
  //     ulTriggerZero: '',
  //     olTrigger: '>',
  //     olTransform: 'zero'
  //   })
  //   console.log(
  //     '%c XXX',
  //     'color: yellow; font-size: large',
  //     Object.keys(XXX).length,
  //     XXX
  //   )
  // }

  const submitHandler = (
    values: ITransformSettings,
    actions: FormikHelpers<ITransformSettings>
  ): void => {
    dispatch(setProcessing(true))

    dispatch(setTransformSettings(values))

    const result = processSheet(sheetData, values)

    const waitTime = Object.keys(result).length * 10

    setTimeout(
      () => {
        dispatch(saveTransformResult(result))

        actions.setSubmitting(false)

        dispatch(setProcessing(false))
      },
      waitTime < 1000 ? 1000 : waitTime > 5000 ? 5000 : waitTime
    )
  }

  if (!sheetData) return null

  return (
    <Grid item xs={12} className={classes.section}>
      <Formik
        initialValues={initialState.transformSettings}
        onSubmit={submitHandler}
        validationSchema={TransformSettingsSchema}>
        {({ dirty, isValid, isSubmitting }) => {
          return (
            <Form className={classes.Editor_TransformSettings_paperGrid}>
              <Paper
                className={clsx(
                  classes.Editor_TransformSettings_paperGrid_position0,
                  classes.paper
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Scope Range
                </Typography>
                <FormikField
                  name="rangeStart"
                  label="Range Start"
                  id="rangeStart-input"
                  placeholder="a8"
                  helperMessage="Max columns ZZ"
                  style={classes.topMargin}
                />
                <FormikField
                  name="rangeEnd"
                  label="Range End"
                  id="rangeEnd-input"
                  placeholder="w49"
                  helperMessage="Max columns ZZ"
                  style={classes.topMargin}
                />
              </Paper>
              <Paper
                className={clsx(
                  classes.Editor_TransformSettings_paperGrid_position1,
                  classes.paper
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Under Limit
                </Typography>
                <FormikField
                  required
                  name="ulTrigger"
                  label="Trigger Character"
                  id="ulTrigger-input"
                  placeholder="<, -, or custom"
                  style={classes.topMargin}
                />
                <FormikField
                  required
                  kind="select"
                  name="ulTransform"
                  label="Transform Function"
                  id="ulTransform-input"
                  placeholder="<, -, or custom"
                  options={transformOptions}
                  style={classes.topMargin}
                />
                <FormikField
                  name="ulTriggerZero"
                  label="Zero Trigger"
                  id="ulTriggerZero-input"
                  placeholder="null, void, under, etc."
                  style={classes.topMargin}
                />
              </Paper>
              <Paper
                className={clsx(
                  classes.Editor_TransformSettings_paperGrid_position2,
                  classes.paper
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Over Limit
                </Typography>
                <FormikField
                  required
                  name="olTrigger"
                  label="Trigger Character"
                  id="olTrigger-input"
                  placeholder=">, +, or custom"
                  style={classes.topMargin}
                />
                <FormikField
                  required
                  kind="select"
                  name="olTransform"
                  label="Transform Function"
                  id="olTransform-input"
                  placeholder=">, +, or custom"
                  options={transformOptions}
                  style={classes.topMargin}
                />
              </Paper>
              <div className={classes.actionButtons}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || !isValid || !dirty}
                      className={clsx(
                        classes.formButton,
                        classes.submitButton
                      )}>
                      {isSubmitting ? <CachedIcon size="1rem" /> : 'Process'}
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      type="reset"
                      variant="contained"
                      disabled={isSubmitting || !dirty}
                      className={clsx(classes.formButton, classes.resetButton)}>
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Grid>
  )
}
