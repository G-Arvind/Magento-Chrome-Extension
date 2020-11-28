<?php
/**
 * Clean Magento Cache
 *
 */
declare(strict_types=1);

namespace Ztech\ChromeExt\Controller\Index;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Cache\Manager;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Forward;
use Magento\Framework\Controller\Result\ForwardFactory;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;
use Magento\Setup\Exception;

class Cacheclean implements HttpGetActionInterface
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
     * Cacheclean constructor.
     * @param PageFactory $pageFactory
     * @param JsonFactory $resultJsonFactory
     * @param Manager $cacheManager
     * @param ForwardFactory $forwardFactory
     * @param RequestInterface $request
     */
    public function __construct(
        PageFactory $pageFactory,
        JsonFactory $resultJsonFactory,
        Manager $cacheManager,
        ForwardFactory $forwardFactory,
        RequestInterface $request
    ) {
        $this->_pageFactory = $pageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->cacheManager = $cacheManager;
        $this->forwardFactory = $forwardFactory;
        $this->request = $request;
    }

    /**
     * @return Forward|Json
     */
    public function execute()
    {
        $result = $this->resultJsonFactory->create();

        if ($this->request->getParam('ajax') || $this->request->getParam('isAjax')) {
            try {
                $this->cacheManager->clean($this->cacheManager->getAvailableTypes());
                $response [] =
                    [
                        'code' => "200",
                        'message' => 'success'
                    ];
            } catch (Exception $e) {
                $response [] =
                    [
                        'code' => "500",
                        'message' => 'error' . json_encode($e)
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
