import cloudstorage as gcs
import logging
from time import time

my_default_retry_params = gcs.RetryParams(initial_delay=0.2,
                                          max_delay=5.0,
                                          backoff_factor=2,
                                          max_retry_period=15)
gcs.set_default_retry_params(my_default_retry_params)


def upload(file_data, filename=time()):
    """Create a file.

    The retry_params specified in the open call will override the default
    retry params for this particular file handle.

    Args:
        filename: filename.
    """
    filename = '/openresearch-yale-multiregional/{}'.format(filename)
    logging.info('writing to GCS: file %s' % filename)
    write_retry_params = gcs.RetryParams(backoff_factor=1.1)
    gcs_file = gcs.open(filename,
                        'w',
                        content_type='application/pdf',
                        retry_params=write_retry_params)
    gcs_file.write(file_data)
    gcs_file.close()
    logging.info('GCS write successful')
    return filename


def fetch(filename, bucket='openresearch-yale-multiregional'):
    filename = '/{}/{}'.format(bucket, filename)
    gcs_file = gcs.open(filename, 'r')
    file_data = gcs_file.read()
    gcs_file.close()
    return file_data
