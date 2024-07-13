package sample;

import prerna.sablecc2.om.PixelDataType;
import prerna.sablecc2.om.nounmeta.NounMetadata;
import prerna.sablecc2.reactor.AbstractReactor;
import prerna.util.Utility;

public class SampleReactor extends AbstractReactor {

	public SampleReactor() {
		this.keysToGet = new String[] {"question"};
	}

	@Override
	public NounMetadata execute() {
		String contextProjectId = this.insight.getContextProjectId();
		if(contextProjectId == null) {
			contextProjectId = this.insight.getProjectId();
		}

		if(contextProjectId == null) {
			throw new IllegalArgumentException("Must set the context project to reference the policy bot files");
		}

		organizeKeys();
		String question = Utility.decodeURIComponent(this.keyValue.get(this.keysToGet[0])).trim();

		return new NounMetadata("Did you ask me this? --> " + question, PixelDataType.CONST_STRING);
	}

}
