import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Footer from '../../components/Footer'
import Jumbotron from '../about/modules/Jumbotron'
import ParralaxBlock from '../about/modules/ParralaxBlock'
import MarkdownFile from './posts/why-open-source.md'

// Require() only takes static url variables, so a dynamic (!) imageFolder variable is not allowed
// https://stackoverflow.com/questions/44991669/react-native-require-with-dynamic-string
const backgroundImageList = ['city.jpg', 'mountain.jpg'].map(img =>
  require('../../assets/img/used/' + img),
)

const styles = theme => ({
  call2ActionRoot: {
    margin: 0,
    padding: 0,
  },
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
})

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      markdownTitle: '',
      markdownBody: '',
    }
    this.stepperRef = React.createRef()
    this.call2actionRef = React.createRef()
  }

  // scrolling function
  scrollToStepper = () => {
    this.stepperRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  scrollToCall2Action = () => {
    this.call2actionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state
    fetch(MarkdownFile)
      .then(res => res.text())
      .then(text => {
        // Separate title from body
        let lines = text.split('\n')
        let title = lines[0].slice(2)
        lines.splice(0, 2)
        let body = lines.join('\n')
        this.setState({
          markdownTitle: title,
          markdownBody: body,
        })
      })
  }

  render() {
    const { markdownTitle, markdownBody } = this.state
    const { classes } = this.props

    const mapping = {
      p: props => <Typography paragraph={true} {...props} />,
      // need a named function to avoid ESLint error
      li: function LeftAlignedListItem({ ordered, ...props }) {
        return (
          <li
            style={{ textAlign: 'left', marginTop: 0, marginBottom: 0 }}
            {...props}
          />
        )
      },
      h1: props => (
        <Typography
          variant="h2"
          component="h1"
          gutterBottom={true}
          {...props}
        />
      ),
      h3: props => <Typography variant="h4" gutterBottom={true} {...props} />,
      img: ({ alt, src, title }) => (
        <img
          alt={alt}
          src={src}
          title={title}
          style={{ maxWidth: '700px', width: '100%' }}
        />
      ),
    }

    return (
      <React.Fragment>
        <Jumbotron
          scrollTo={this.scrollToStepper}
          backgroundImage={backgroundImageList[0]}
        >
          {markdownTitle}
        </Jumbotron>

        <Container
          ref={this.stepperRef}
          id="main"
          component="section"
          className={classes.root}
        >
          <ReactMarkdown
            children={markdownBody}
            components={mapping}
            transformImageUri={uri =>
              uri.startsWith('http') ? uri : require(`../../assets/img/${uri}`)
            }
          />
        </Container>

        <ParralaxBlock
          imageUrl={backgroundImageList[1]}
          imageAlt="A snowy stairway leading up a mountain"
        >
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            color="primary"
            onClick={() => {
              sessionStorage.clear()
            }}
            size="large"
          >
            Try the app
          </Button>
        </ParralaxBlock>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Blog)
