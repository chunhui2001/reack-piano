
function FormDataEditerTable () {

}

FormDataEditerTable.prototype.get() {
	return "<table className={'query-params-table'}>
            <tbody>
              <tr>
                <th style={{width:'25px'}}>&nbsp;</th>
                <th>KEY</th>
                <th>VALUE</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td style={{textAlign:'right'}}><input type="checkbox" /></td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
                <td className={'inputCell'}>
                  <div><input type="text" /></div>
                </td>
              </tr>
            </tbody>
          </table>";
}

export default new FormDataEditerTable();