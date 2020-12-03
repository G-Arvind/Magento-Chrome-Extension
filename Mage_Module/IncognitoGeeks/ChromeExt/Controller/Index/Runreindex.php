<?php
/**
 * Perform ReIndex
 *
 */
declare(strict_types=1);

namespace IncognitoGeeks\ChromeExt\Controller\Index;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Cache\Manager;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Forward;
use Magento\Framework\Controller\Result\ForwardFactory;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;
use Magento\Indexer\Model\Indexer\CollectionFactory;
use Magento\Indexer\Model\IndexerFactory;
use Magento\Setup\Exception;

class Runreindex implements HttpGetActionInterface
{
    /**
     * @var PageFactory
     */
    private $_pageFactory;

    /**
     * @var JsonFactory
     */
    private $resultJsonFactory;

    /**
     * @var Manager
     */
    private $cacheManager;

    /**
     * @var ForwardFactory
     */
    private $forwardFactory;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var IndexerFactory
     */
    private $indexerFactory;

    /**
     * @var CollectionFactory
     */
    private $indexCollection;

    /**
     * Runreindex constructor.
     * @param PageFactory $pageFactory
     * @param JsonFactory $resultJsonFactory
     * @param Manager $cacheManager
     * @param ForwardFactory $forwardFactory
     * @param RequestInterface $request
     * @param IndexerFactory $indexerFactory
     * @param CollectionFactory $indexCollection
     */
    public function __construct(
        PageFactory $pageFactory,
        JsonFactory $resultJsonFactory,
        Manager $cacheManager,
        ForwardFactory $forwardFactory,
        RequestInterface $request,
        IndexerFactory $indexerFactory,
        CollectionFactory $indexCollection
    ) {
        $this->_pageFactory = $pageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->cacheManager = $cacheManager;
        $this->forwardFactory = $forwardFactory;
        $this->request = $request;
        $this->indexerFactory = $indexerFactory;
        $this->indexCollection = $indexCollection;
    }

    /**
     * @return Forward|Json
     * @throws \Throwable
     */
    public function execute()
    {
        $result = $this->resultJsonFactory->create();

        if (true) {
            try {
                $indexerCollection = $this->indexCollection->create();
                $indexIds = $indexerCollection->getAllIds();
                foreach ($indexIds as $indexId) {
                    $indexIdArray = $this->indexerFactory->create()->load($indexId);
                    $indexIdArray->reindexAll($indexId);
                }
                $response [] =
                    [
                        'code' => "200",
                        'message' => 'success'
                    ];
            } catch (Exception $e) {
                $response [] =
                    [
                        'code' => "500",
                        'message' => 'error' . $e->getMessage()
                    ];
            }
            return $result->setData($response);
        } else {
            //redirect
            $forward = $this->forwardFactory->create();
            return $forward->forward('defaultNoRoute');
        }
    }
}
