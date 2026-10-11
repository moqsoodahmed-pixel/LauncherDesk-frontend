import { Link } from 'react-router-dom'

export default function StateDetailsStep({ st, verified }) {
  return (
    <>
      <h2>Confirm the state</h2>
      <p className="lead">The stamp must be from the state where the document is signed.</p>
      <div className="lds-f">
        <div className="lbl">State jurisdiction</div>
        <div className="lds-duty-fixed">
          <b>{st.name}</b>
          {st.script && <span lang="und">{st.script}</span>}
        </div>
      </div>
      <p className="lds-help">
        Wrong state? <Link to="/estamp#all-states">Change state</Link>.
      </p>
      <div className="lds-rule">
        <span>
          {verified
            ? <>We have {st.name}'s official stamp-act article list, so duty is filled in automatically where the rules fix it.</>
            : <>We confirm the exact {st.name} article and duty before buying the stamp, and call you if anything needs to change.</>}
        </span>
      </div>
    </>
  )
}
