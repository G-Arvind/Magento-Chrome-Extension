<?php
/**
 * Clean Magento Cache
 *
 */
declare(strict_types=1);

namespace Ztech\ChromeExt\Controller\Index;

use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Forward;
use Magento\Framework\Controller\Result\ForwardFactory;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;

class Testconnection implements HttpGetActionInterface
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
     * @param ForwardFactory $forwardFactory
     * @param RequestInterface $request
     */
    public function __construct(
        PageFactory $pageFactory,
        JsonFactory $resultJsonFactory,
        ForwardFactory $forwardFactory,
        RequestInterface $request
    ) {
        $this->_pageFactory = $pageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->forwardFactory = $forwardFactory;
        $this->request = $request;
    }

    /**
     * @return Forward|Json
     */
    public function execute()
    {
        $result = $this->resultJsonFactory->create();

        if (true) {
            $response [] =
                [
                    'code' => "200",
                    'message' => 'success'
                ];
            return $result->setData($response);
        } else {
            //redirect
            $forward = $this->forwardFactory->create();
            return $forward->forward('defaultNoRoute');
        }
    }
}
