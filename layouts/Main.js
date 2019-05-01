import Head from 'next/head'
import './style.scss'


const LayoutMain = props => (
  <div className="wrapper-main">
    <Head>
      <title>May 1st Birthday</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"/>
      <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
    </Head>
    {props.children}
  </div>
)

export default LayoutMain